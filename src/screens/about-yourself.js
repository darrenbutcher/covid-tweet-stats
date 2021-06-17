import React, { forwardRef, useImperativeHandle, useEffect } from "react"
import { ErrorMessage, useForm } from "react-hook-form"
import { useMutation } from "urql"
import FullScreen from "../molecules/full-screen"
import "../form.scss"

const addProfileMutation = `
mutation($firstName: String!, $lastName: String!, $uid: String! ) {
  insert_profiles_one(object: {firstName: $firstName, lastName: $lastName, uid: $uid}, on_conflict: {constraint: profiles_pkey, update_columns: [firstName, lastName]}) {
    uid
    firstName
    lastName
  }
}
`

const firstnameValidations = {
  required: {
    value: true,
    message: "this is required",
  },
  minLength: {
    value: 3,
    message: "must be atleast 3 chars",
  },
  maxLength: {
    value: 20,
    message: "not more 20 chars",
  },
  pattern: {
    value: /^[A-Za-z]+$/i,
    message: "must be alphanumeric",
  },
}

const lastnameValidations = {
  required: {
    value: true,
    message: "this is required",
  },
  minLength: {
    value: 3,
    message: "must be atleast 3 chars",
  },
  maxLength: {
    value: 20,
    message: "not more 20 chars",
  },
}

const AboutYourself = ({ onChange, user }, ref) => {
  const [addProfileResult, addProfile] = useMutation(addProfileMutation)
  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  })

  useImperativeHandle(ref, () => ({
    isValid: () => {
      return formState.isValid
    },
    onSubmit: cb => handleSubmit(cb)(),
    beforeNext: () => {
      const firstName = watch("firstname")
      const lastName = watch("lastname")
      if (user) addProfile({ firstName, lastName, uid: user.uid })
    },
  }))

  const renderForm = () => {
    return (
      <>
        <label htmlFor="firstname" className="form__label_">
          First name
        </label>
        <input
          type="input"
          name="firstname"
          className="form__field_"
          ref={register(firstnameValidations)}
          onChange={onChange}
        />
        <ErrorMessage errors={errors} name="firstname" />
        <label htmlFor="lastname" className="form__label_">
          Last name
        </label>
        <input
          type="input"
          name="lastname"
          className="form__field_"
          ref={register(lastnameValidations)}
          onChange={onChange}
        />
        <ErrorMessage errors={errors} name="lastname" />
      </>
    )
  }

  return (
    <FullScreen>
      <h2
        style={{
          paddingBottom: "16px",
          marginTop: "32px",
          textAlign: "center",
        }}
      >
        Tell us about yourself
      </h2>
      <p style={{ paddingBottom: "16px", textAlign: "center" }}>
        We would like to know more about you so that we can create your profile.
      </p>
      {renderForm()}
    </FullScreen>
  )
}

export default forwardRef(AboutYourself)
