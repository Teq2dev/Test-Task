import React from 'react'
import Model from '../Model'
import Input from '../../form/Input'
import SecondaryButton from '../../../components/common/SecondaryButton'

function ChangePassword({ onClose, onSave }) {
    return (
        <div>
            <Model onClose={onClose} title="Change Password" modalClass="w-1/2!">
                <div>
                    <Input label="New Password" isRequired={true} placeholder="Enter new password" />
                    <Input label="Confirm Password" isRequired={true} placeholder="Enter confirm password" />
                </div>

                <div className='mt-5'>
                    <SecondaryButton title="Save Password"/>
                </div>
            </Model>
        </div>
    )
}

export default ChangePassword