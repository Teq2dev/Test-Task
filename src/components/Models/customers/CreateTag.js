"use client"
import { useEffect, useState } from "react";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import InputForm from "../../form/InputForm";
import ColorInputForm from "../../form/ColorInputForm";
import Model from "../Model";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../../../../helper";

export default function CreateTag({ onClose, id }) {
    const { register, setValue, handleSubmit, formState: { errors }, } = useForm();
    const [sending, setSending] = useState(false)

    useEffect(() => {
        setValue("colorPicker", "#0396FF");
        if (id) {
            setValue("tagName", "Demo Tag");
            setValue("colorPicker", "#0396FF");
            setValue("description", "Yeh ek demo tag hai");
            setValue("taggedCustomers", 150);
        }
    }, [setValue, id]);

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null
            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Updated Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }

    return (
        <Model onClose={onClose} title={`${!id ? "Create New Tag" : "Edit"}`} modalClass="w-1/2!">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputForm
                        class_="mt-2!"
                        label="Tag Name"
                        isRequired={true}
                        placeholder="Enter Name"
                        formProps={{ ...register("tagName", { required: true }) }}
                        errors={errors}
                    />
                    <ColorInputForm label="Color Picker"
                        formProps={{ ...register("colorPicker", { required: false }) }}
                        setValue={setValue}
                        errors={errors}
                    />
                    <InputForm label="Description" isTextArea={true} rows={3}
                        formProps={{ ...register("description", { required: false }) }}
                        errors={errors}
                    />
                    {id && (
                        <div className="mt-2! font-medium text-base">
                            Tagged Customers 150
                        </div>
                    )}
                </div>

                {/* {!id && <div className="relative mt-4">
                    <button type="button" className="flex bg-[#0396FF10] items-center gap-3 border border-[#0396FF80] rounded-[11px] py-2.5 px-3 text-primary text-sm font-medium w-full disabled:pointer-events-none disabled:opacity-50"><Image src="/images/setting.svg" alt="settings" height={36} width={36} unoptimized={true} />Updated</button>

                    <button type="button" className="absolute right-3 top-4 disabled:pointer-events-none"><Image src="/images/close-square.svg" alt="close" height={18} width={18} unoptimized={true} /></button>
                </div>} */}

                <div className="grid grid-cols-2 gap-3 mt-[30px]">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="save" type="submit" disabled={sending} class_="text-lg!" />
                </div>
            </form>
        </Model>
    )
}