import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function FileUploader() {
  const [files, setFiles] = useState<
    {
      name: any;
      size: any;
      preview: string;
    }[]
  >([]);

  const onDrop = (acceptedFiles: any[]) => {
    const newFiles = acceptedFiles.map((file) => {
      return {
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file),
      };
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const defaultPreview = "path-to-default-preview-image";

  return (
    <div className="h-full w-full sm:px-8 sm:py-8 md:px-16">
      <main className="container mx-auto h-full max-w-screen-lg">
        <div
          {...getRootProps()}
          className={cn(
            "relative flex h-full flex-col rounded-md bg-slate-900 shadow-xl",
            {
              "border-blue-700": isDragActive,
              "border-slate-400": !isDragActive,
            }
          )}
        >
          <input {...getInputProps()} multiple />

          {isDragActive ? (
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded-md bg-blue-100 opacity-75">
              <svg
                className="mb-3 h-12 w-12 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
              </svg>
              <p className="text-lg">Drop files to upload</p>
            </div>
          ) : (
            <div className="flex h-full flex-col p-8">
              <header className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 py-12">
                <p className="mb-3 flex  flex-wrap justify-center font-semibold">
                  <span>Drag and drop your</span>&nbsp;
                  <span>files anywhere or</span>
                </p>
                <Button>Browse</Button>
              </header>

              <h1 className="pb-3 pt-8 font-semibold sm:text-lg ">
                Pending Uploads
              </h1>

              <ul className="-m-1 flex flex-1 flex-wrap">
                {files.length === 0 ? (
                  <li className="flex h-full w-full flex-col items-center items-center justify-center text-center">
                    <img
                      className="mx-auto w-32"
                      src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                      alt="no data"
                    />
                    <span className="text-small text-gray-500">
                      No files selected
                    </span>
                  </li>
                ) : (
                  files.map((file, index) => (
                    <li
                      key={index}
                      className="xl:w-1/8 block h-24 w-1/2 p-1 sm:w-1/3 md:w-1/4 lg:w-1/6"
                    >
                      <article
                        tab-index="0"
                        className="focus:shadow-outline elative group relative h-full w-full cursor-pointer rounded-md bg-gray-100 shadow-sm focus:outline-none"
                      >
                        <img
                          alt="upload preview"
                          className="img-preview sticky h-full w-full rounded-md bg-fixed object-cover"
                          src={file.preview || defaultPreview}
                        />

                        <section className="absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs">
                          <h1 className="flex-1 group-hover:text-blue-800">
                            {file.name}
                          </h1>
                          <div className="flex">
                            <span className="p-1 text-blue-800">
                              <i>
                                <svg
                                  className="ml-auto h-4 w-4 fill-current pt-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                                </svg>
                              </i>
                            </span>
                            <p className="size p-1 text-xs">
                              {file.size > 1024
                                ? file.size > 1048576
                                  ? Math.round(file.size / 1048576) + "mb"
                                  : Math.round(file.size / 1024) + "kb"
                                : file.size + "b"}
                            </p>
                            <Button
                              onClick={() => removeFile(index)}
                              variant="ghost"
                            >
                              <TrashIcon size={10} className="text-red-500" />
                            </Button>
                          </div>
                        </section>
                      </article>
                    </li>
                  ))
                )}
              </ul>

              <footer className="flex justify-end space-x-3 px-8 pb-8 pt-4">
                <Button variant="outline">
                  {/* onClick={cancelHandler} */}Cancel
                </Button>
                <Button>{/* onClick={submitHandler} */}Upload</Button>
              </footer>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default FileUploader;
