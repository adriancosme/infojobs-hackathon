"use client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TextArea from "../components/TextArea";
import useCurriculum from "../hooks/useCurriculum";
import { useYupValidationResolver } from "../hooks/useYupValidationResolver";
import { Label } from "../styled-components/label.styled.component";
export default function ResumePage() {
  const {
    curriculums,
    isLoading,
    isError,
    trigger: analizeDescription,
    isMutating,
  } = useCurriculum();  
  const [content, setContent] = useState("");

  const schema = yup.object({
    description: yup.string().required("Campo requerido"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(schema),
  });

  const handleAnalize = async () => {
    const result = await analizeDescription({
      lang: "ES",      
      text: content,
    });
    console.log(result);
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

  const handleSetContent = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    const index = curriculums.experience?.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }    
    setContent(curriculums.experience[index].description ?? "");
  };

  return (
    <div className="container-wrapper mt-4 w-full m-auto">
      <div className="flex flex-row gap-4  w-full h-full">
        <section className="flex-row items-start relative shadow-sm bg-white rounded-lg p-6 m-4 w-[320px]">
          <h1 className="pb-4 border-gray-300 block text-lg border-b font-bold">
            Tu experiencia
          </h1>
          <div className="flex flex-col">
            {curriculums?.experience?.map(({ id, job, company }) => {
              return (
                <div key={id} className="flex flex-col my-2.5">
                  <div className="flex flex-col">
                    <span className="block text-sm font-bold text-ellipsis max-w-full whitespace-nowrap overflow-hidden">
                      {job}
                    </span>
                  </div>
                  <span>{company}</span>
                  <div className="flex mt-2">
                    <button
                      onClick={(e) => handleSetContent(e, id)}
                      className="bg-blue-500 px-2 py-1 rounded-md mr-2 text-white uppercase text-[12px] font-[700]"
                    >
                      Ver
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="flex-grow flex-shrink basis-0 relative">
          <form
            className="flex flex-col gap-4 flex-grow flex-shrink m-4"            
          >
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
              defaultValue={content}
            ></TextArea>
            <button
              type="button"
              className="bg-blue-500 px-2 py-1 rounded-md text-gray-100 uppercase text-sm font-bold"
              disabled={isMutating}
              onClick={handleAnalize}
            >
              Analizar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
