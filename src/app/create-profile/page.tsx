"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateProfileStep1 } from "./stepOne"
import { CreateProfileStep2 } from "./stepTwo"
import { useState } from "react"

export default function CreateProfile() {
const [currentStep, SetCurrentStep] = useState(1)
const [userInfo, setUserInfo] = useState({
image: "",
name: "",
about: "",
socialURL: ""

})

const [error, setError] = useState({
image: "",
name: "",
about: "",
socialURL: ""
})

const onChange = (e: any) => {
const field = e.target.id;
const value = e.target.value;
const newValues = {...userInfo, [field]: value};

}





return (
<div>
  <CreateProfileStep1/>



</div>

)
}
