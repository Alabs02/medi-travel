"use client";

import { nanoid } from "nanoid";
import { db } from "@/firebase";
import { useClinicStore } from "@/store/clinic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { FormValues } from "@/components/forms";
import { useAuthStore } from "@/store/auth";
import { isEmpty, kebabCase, toLower } from "@/_";
import { toast } from "./use-toast";
import { Store } from "@/models";

const CLINICS_COLLECTION = "clinics";
const UPLOAD_PRESET: string = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_ENV}/image/upload`;

const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "clinics");

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();

  return data.secure_url;
};

export const addClinic = async (clinicData: FormValues) => {
  const user = useAuthStore.getState().getUser();

  if (isEmpty(user)) throw new Error("User not authenticated");

  const clinicSlug = kebabCase(
    `${clinicData.name}-${clinicData.location}-${toLower(nanoid(5))}`
  );

  const saving = clinicData.usEstimatedCost - clinicData.clinicEstimatedCost;
  const dateCreated = new Date().toISOString();

  let galleryLinks: string[] = [];
  if (clinicData.gallery.length > 0) {
    const uploadPromises = clinicData.gallery.map((file) =>
      uploadToCloudinary(file)
    );

    galleryLinks = await Promise.all(uploadPromises);
  }

  const newClinic = {
    ...clinicData,
    clinicSlug,
    saving,
    rating: 0,
    gallery: galleryLinks,
    createdBy: {
      id: user.uid,
      name: user.displayName
    },
    dateCreated
  };

  const docRef = await addDoc(collection(db, CLINICS_COLLECTION), newClinic);

  return { id: docRef.id, ...newClinic };
};

export const useAddClinic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addClinic"],
    mutationFn: (payload: FormValues) => addClinic(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLINICS_COLLECTION] });

      toast({
        title: "Clinic Published! ✅",
        description:
          "Your clinic is now live. Help more people find affordable care!"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops! Clinic Not Added",
        description:
          "Something went wrong. Please check your details and try again."
      });
    }
  });
};

export const useClinics = () => {
  const setClinics = useClinicStore.getState().setClinics;

  return useQuery({
    queryKey: [CLINICS_COLLECTION],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, CLINICS_COLLECTION));
      const clinics: Store.Clinic[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as any;

      setClinics(clinics);
      return clinics;
    }
  });
};

export const useClinicBySlug = (clinicSlug: string) => {
  return useQuery({
    queryKey: [CLINICS_COLLECTION, clinicSlug],
    queryFn: async () => {
      const q = query(
        collection(db, CLINICS_COLLECTION),
        where("clinicSlug", "==", clinicSlug)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return {
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data()
        } as Store.Clinic;
      }
      return null;
    },
    enabled: !!clinicSlug
  });
};
