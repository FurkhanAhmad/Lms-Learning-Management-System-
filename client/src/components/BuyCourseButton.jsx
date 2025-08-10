import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateChecKoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateChecKoutSessionMutation();

  const purchaseCourseHandler = async () => {
    try {
      console.log("⏩ courseId in button:", courseId);

      await createCheckoutSession({ courseId }); // ✅ correct object
    } catch (error) {
      toast.error("Unexpected error");
      console.error(error);
    }
  };
 
  useEffect(() => {
    if (isSuccess && data?.url) {
      window.location.href = data.url;
    } else if (isSuccess && !data?.url) {
      toast.error("Invalid response from server.");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
  }, [isSuccess, isError, data, error]);

  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
