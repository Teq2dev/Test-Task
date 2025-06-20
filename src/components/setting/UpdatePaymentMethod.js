import { useState } from "react";
import InputForm from "../form/InputForm";
import { useForm } from "react-hook-form";
import Model from "../Models/Model";
import { toast } from "react-toastify";
import CancelButton from "../common/CancelButton";
import SecondaryButton from "../common/SecondaryButton";
import { getError } from "../../../helper";
import axios from "axios";
import RadioForm from "../form/RadioForm";
import { type } from "os";

export default function UpdatePaymentMethod({ onClose, id, ids }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [sending, setSending] = useState(false)

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null

            if (id !== "add") {
                res = await axios.put("/api", data)
            } else {
                res = await axios.post("/api", data)
            }

            toast.success("Saved Successfully")
            setSending(false)
            onClose()
        } catch (error) {
            toast.error(getError(error))
            setSending(false)
        }
    }
    return (
        <Model onClose={onClose} title={id === "update" ? "Update Payment Method" : "Current Payment Method"} modalClass="w-[50%]!">
            <form onSubmit={handleSubmit(onSubmit)}>

                <InputForm
                    label="Card Number"
                    class_="mt-3! w-full!"
                    inputType="number"
                    isRequired={true} inputClass="mt-2.5"
                    formProps={{ ...register("additional", { required: true }) }}
                    errors={errors}
                    rows={5}
                    placeholder="Enter card number"
                />

                <div className="flex justify-between items-center">
                    <div>
                        <div className="font-medium mt-4">
                            Select Payment Method
                        </div>

                        <div className="flex gap-2">
                            <RadioForm label="Credit Card" class_="font-medium" />
                            <RadioForm label="Bank Transfer" class_="font-medium" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <SecondaryButton title="add new payment method" type="button" />
                    </div>
                </div>

                <div className="flex justify-between mt-3">
                    <div className="text-text3 capitalize text-base">card number</div>
                    <div className="font-semibold">4242 4242 4242 4242</div>
                </div>

                <hr className="border border-border2 my-3" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize text-base">expiry date</div>
                    <div className="font-semibold">Apr 1, 2025</div>
                </div>

                <hr className="border border-border2 my-3" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize text-base">CVV</div>
                    <div className="font-semibold">****</div>
                </div>
                <hr className="border border-border2 my-3" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize text-base">cardholder name</div>
                    <div className="font-semibold">John Deo</div>
                </div>
                <hr className="border border-border2 my-3" />

                <div className="flex justify-between">
                    <div className="text-text3 capitalize text-base">billing address</div>
                    <div className="font-semibold">XYZ..</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <CancelButton title="Cancel" onClick={onClose} class_="text-lg!" />
                    <SecondaryButton title="Save Payment Method" type="submit" class_="text-lg!" disabled={sending} />
                </div>
            </form>
        </Model >
    )
}