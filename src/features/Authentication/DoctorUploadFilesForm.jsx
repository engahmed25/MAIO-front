import FormInput from "./FormInput";
import FormRow from "./FormRow";
import { useForm, Controller } from "react-hook-form";
import UploadFilesInput from "./UploadFilesInput";
import UploadGroup from "./UploadGroup";
import Button from "../../ui/Button";
import UploadPicture from "./UploadPicture";
import { useDoctorRegister } from "../../Context/DoctorRegisterContext";

function DoctorUploadFilesForm({ onNext }) {
  const { updateFormData, formData } = useDoctorRegister();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: formData.step2,
  });

  const onSubmit = (data) => {
    // try {
    //   console.log("Register data:", data);
    //   // TODO: integrate with auth API (e.g., call register service)
    //   onNext();
    // } catch (err) {
    //   console.error(err);
    // }

    console.log("Form submitted:", data);
    updateFormData("step2", data);
    onNext();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col  ">
      <h2 className="mb-5 flex  items-center justify-center font-bold text-3xl ">
        UPLOAD YOUR FILES 📁
      </h2>
      <form
        className="shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-12 rounded-2xl h-[77%] overflow-auto w-[90%] md:w-auto "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <Controller
          name="profilePicture"
          control={control}
          rules={{
            required: "Profile Picture is required",
            validate: (files) => {
              if (!files || files.length === 0) return "Please upload a file";
              const allowed = ["image/jpeg", "image/png", "image/jpg"];
              if (!allowed.includes(files[0].type))
                return "Only JPG, JPEG, PNG allowed";
              return true;
            },
          }}
          render={({ field }) => (
            // <UploadFilesInput
            //   {...field}
            //   label="Upload your Profile Picture"
            //   helperText="Supported: jpg, jpeg, png"
            //   allowedTypes={["image/jpeg", "image/png", "image/jpg"]}
            //   onFileAccepted={(file) => field.onChange(file)}
            //   error={errors.profilePicture}
            //   multiple={false}
            //   dropActiveText="Release to upload your Profile Picture"
            //   dropInactiveText="Drag 'n' drop your Profile Picture here, or click to select"
            // />

            <UploadPicture
              onFileAccepted={(file) => field.onChange(file)}
              error={errors.profilePicture}
              label="Upload your Profile Picture"
              helperText="Supported: jpg, jpeg, png"
              allowedTypes={["image/*"]}
            />
          )}
        /> */}

        <Controller
          name="profilePicture"
          control={control}
          rules={{
            required: "Profile Picture is required",
            validate: (file) => {
              if (!file) return "Please upload a file";
              const allowed = ["image/jpeg", "image/png", "image/jpg"];
              if (!allowed.includes(file.type))
                return "Only JPG, JPEG, PNG allowed";
              return true;
            },
          }}
          render={({ field }) => (
            <UploadPicture
              onFileAccepted={(file) => field.onChange(file)}
              error={errors.profilePicture}
              label="Upload your Profile Picture"
              helperText="Supported: jpg, jpeg, png"
              allowedTypes={["image/*"]}
            />
          )}
        />
        {/* Profile Picture & PhD Certificate */}
        <Controller
          name="idProof"
          control={control}
          rules={{
            required: "ID Proof is required",
            validate: (files) => {
              if (!files || files.length === 0) return "Please upload a file";
              const allowed = ["image/jpeg", "image/png", "image/jpg"];
              if (!allowed.includes(files[0].type))
                return "Only JPG, JPEG, PNG allowed";
              return true;
            },
          }}
          render={({ field }) => (
            <UploadFilesInput
              {...field}
              label="Upload your ID Proof"
              helperText="Supported: jpg, jpeg, png"
              allowedTypes={["image/jpeg", "image/png", "image/jpg"]}
              onFileAccepted={(file) => field.onChange(file)}
              error={errors.idProof}
              multiple={false}
              dropActiveText="Release to upload your ID Proof"
              dropInactiveText="Drag 'n' drop your ID Proof here, or click to select"
            />
          )}
        />
        {/* ID Proof & Medical License */}
        <UploadGroup
          className="mt-6"
          title="َAcademic & Professional Documents"
        >
          {/* //! controller is like register but register used for plain HTML inputs 
          // ! but no we have our custom input so we used controller from react hook form it connect the custom input with react hook form */}
          <Controller
            name="phdCertificate"
            control={control}
            rules={{
              required: "PhD Certificate is required",
              validate: (files) => {
                if (!files || files.length === 0) return "Please upload a file";
                const allowed = [
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ];
                if (!allowed.includes(files[0].type))
                  return "Only PDF, DOC, DOCX allowed";
                return true;
              },
            }}
            render={({ field }) => (
              <UploadFilesInput
                {...field}
                label="Upload your PhD Certificate"
                helperText="Supported: pdf, doc, docx"
                allowedTypes={[
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ]}
                onFileAccepted={(file) => field.onChange(file)}
                error={errors.phdCertificate}
                multiple={false}
                dropActiveText="Release to upload your PhD Certificate"
                dropInactiveText="Drag 'n' drop your PhD Certificate here, or click to select"
              />
            )}
          />
          <Controller
            name="medicalLicense"
            control={control}
            rules={{
              required: "Medical License is required",
              validate: (files) => {
                if (!files || files.length === 0) return "Please upload a file";
                const allowed = [
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ];
                if (!allowed.includes(files[0].type))
                  return "Only PDF, DOC, DOCX allowed";
                return true;
              },
            }}
            render={({ field }) => (
              <UploadFilesInput
                {...field}
                label="Upload your Medical License"
                helperText="Supported: pdf, doc, docx"
                allowedTypes={[
                  "application/pdf",
                  "application/msword",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ]}
                onFileAccepted={(file) => field.onChange(file)}
                error={errors.medicalLicense}
                multiple={false}
                dropActiveText="Release to upload your Medical License"
                dropInactiveText="Drag 'n' drop your Medical License here, or click to select"
              />
            )}
          />
        </UploadGroup>

        <Button type="submit" className="w-full p-2.5" disabled={isSubmitting}>
          {isSubmitting ? "Forwarding..." : "Last Step: Clinic Details"}
        </Button>
      </form>
    </div>
  );
}

export default DoctorUploadFilesForm;
