"use client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TextInput, { InputType } from "../components/TextInput";
import { useYupValidationResolver } from "../hooks/src/hooks/useYupValidationResolver";
import { Label } from "../styled-components/label.styled.component";
import { ChangeEvent } from "react";
import TextArea from "../components/TextArea";
export default function ResumePage() {
  const { data } = useSession();
  const schema = yup.object({
    cargo: yup.string().required("Campo requerido"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(schema),
  });

  const handleSave = (data: any) => {
    console.log(data);
  };
  const onChangeTextInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const splitTextOnEveryNewLine = e.target.value.split("\n");
    const lines = splitTextOnEveryNewLine.map((line, index) => {
      // Check if line is empty
      if (line.length === 0) {
        return line;
      }
      // If line has • at the beginning, do nothing
      if (line.startsWith("•")) {
        return line;
      }
      // Add • at the beginning of each line
      return `• ${line}`;
    });
    // set the value of the textarea to the lines joined by \n
    e.target.value = lines.join("\n");
  };
  return (
    <div className="container-wrapper mt-4 w-full m-auto">
      <div className="flex flex-row gap-4  w-full h-full">
        <section className="flex-row items-start relative shadow-sm bg-white rounded-lg p-6 m-4 w-[320px]">
          <h1 className="pb-4 border-gray-300 block text-lg border-b font-bold">
            Tu experiencia
          </h1>
          <div className="flex flex-col">
            <div className="flex flex-col my-2.5">
              <div className="flex flex-col">
                <span className="block text-sm font-bold text-ellipsis max-w-full whitespace-nowrap overflow-hidden">
                  Posición 1
                  asdasdasdsahjkafshjkfashjkfashjkafshkjafskjhafshkjafsafsjhkafskjhafshkj
                </span>
              </div>
              <span>Empresa 1</span>
              <div className="flex mt-2">
                <button className="bg-blue-500 px-2 py-1 rounded-md mr-2 text-white uppercase text-[12px] font-[700]">
                  Ver
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="flex-grow flex-shrink basis-0 relative">
          <form
            className="flex flex-col gap-4 flex-grow flex-shrink m-4"
            onSubmit={handleSubmit(handleSave)}
          >
            {/* <div className="flex flex-col gap-4">
              <Label>Cargo</Label>
              <TextInput
                errors={errors}
                register={register}
                type={InputType.TEXT}
                name="job"
                placeholder="Web Developer"
              />
            </div>
            <Label>Empresa</Label>
            <TextInput
              errors={errors}
              register={register}
              type={InputType.TEXT}
              name="company"
              placeholder="Infojobs"
            />
            <Label>Periodo</Label>
            <div className="flex flex-row">
              <div className="flex relative">
                <div className="p-0 border-0 mr-4 inline-block w-[80px]">
                  <TextInput
                    errors={errors}
                    register={register}
                    type={InputType.NUMBER}
                    max={12}
                    min={1}
                    name="startMonth"
                    placeholder="MM"
                  />
                </div>
                <span className="flex items-center p-[7px] uppercase z-[1] text-black font-[900] text-sm my-0 mr-[-0.1em] ml-[-1.1em] border-t-2 border-b-2 border-solid border-transparent">
                  -
                </span>
                <div className="p-0 border-0 mr-4 w-[100px] inline-block">
                  <TextInput
                    errors={errors}
                    register={register}
                    type={InputType.TEXT}
                    name="startYear"
                    max={2023}
                    placeholder="AAAA"
                  />
                </div>
                <div className="p-0 border-0 mr-4 inline-block w-[80px]">
                  <TextInput
                    errors={errors}
                    register={register}
                    type={InputType.NUMBER}
                    max={12}
                    min={1}
                    name="endMonth"
                    placeholder="MM"
                  />
                </div>
                <span className="flex items-center p-[7px] uppercase z-[1] text-black font-[900] text-sm my-0 mr-[-0.1em] ml-[-1.1em] border-t-2 border-b-2 border-solid border-transparent">
                  -
                </span>
                <div className="p-0 border-0 mr-4 w-[100px] inline-block">
                  <TextInput
                    errors={errors}
                    register={register}
                    type={InputType.TEXT}
                    name="endYear"
                    max={2023}
                    placeholder="AAAA"
                  />
                </div>
              </div>
            </div> */}
            <Label>¿Qué hiciste en esa empresa?</Label>
            <TextArea
              errors={errors}
              name="description"
              register={register}
              className="w-full font-[600] outline-none m-0 shadow-none px-4 py-2 rounded-md"
              cols={30}
              rows={10}
              placeholder="Describe tus logros obtenidos en esa empresa"
              onChange={onChangeTextInput}
            ></TextArea>
            <button
              type="submit"
              className="bg-blue-500 px-2 py-1 rounded-md text-gray-100 uppercase text-sm font-bold"
            >
              Analizar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
