import {
    configure,
    defineRule,
    ErrorMessage as VeeErrorMessage,
    Field as VeeField,
    Form as VeeForm,
} from "vee-validate";
import {
    alpha_spaces,
    confirmed,
    email,
    max,
    max_value,
    min,
    min_value,
    not_one_of,
    required,
} from "@vee-validate/rules";
import { stringify } from "uuid";

interface FieldContext {
  field: string; // The field's name or label (see next section)
  value: any; // the field's current value
  form: Record<string, any>; // other values in the form
  rule: {
    name: string; //the rule name
    params?: any[]; // any params sent to it
  };
}

interface Messages {
  [key: string]: string;
}

export default {
    install (app: any) {
        app.component("VeeForm", VeeForm);
        app.component("VeeFfield", VeeField);
        app.component("VeeErrorMessage", VeeErrorMessage)

        defineRule("required", required)
        defineRule("tos", required)
        defineRule("min", min)
        defineRule("max", max)
        defineRule("alpha_spaces", alpha_spaces)
        defineRule("email", email)
        defineRule("min_value", min_value)
        defineRule("max_value", max_value)
        defineRule("passwords_mismatch", confirmed)
        defineRule("excluded", not_one_of)
        defineRule("country_excluded", not_one_of)

        configure({
            generateMessage: ({field, rule}) => {
                const messages: Messages = {
                required: `The filed ${field} is required.`,
                min: `The filed ${field} is to short.`,
                max: `The filed ${field} is to long.`,
                alpha_spaces: `The filed ${field} may only contain alphabetic characters and spaces.`,
                email: `The filed ${field} must be a valid email.`,
                min_value: `The filed ${field} is to low.`,
                max_value: `The filed ${field} is to high.`,
                excluded: `You are not allowed to use this value for the field ${field}.`,
                country_excluded: `Due to restrictions, we do not accept users from this location`,
                passwords_mismatch: `The passwords don't match`,
                tos: `You must accept terms of service`,
                };
                
                 let message: string = 'cos chujowo'
                
                if(rule){
                    message = messages[rule.name] ? messages[rule.name] : `The field ${field} is invalid`
                }
                return message;
            },

            //default behaviour
            validateOnBlur: true,
            validateOnChange: true,
            validateOnInput: false,
            validateOnModelUpdate: true,
        });
    }
}