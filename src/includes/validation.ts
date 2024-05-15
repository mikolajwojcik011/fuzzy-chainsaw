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
            generateMessage: (ctx: FieldContext) => {
                const messages: Messages = {
                required: `The filed ${ctx.field} is required.`,
                min: `The filed ${ctx.field} is to short.`,
                max: `The filed ${ctx.field} is to long.`,
                alpha_spaces: `The filed ${ctx.field} may only contain alphabetic characters and spaces.`,
                email: `The filed ${ctx.field} must be a valid email.`,
                min_value: `The filed ${ctx.field} is to low.`,
                max_value: `The filed ${ctx.field} is to high.`,
                excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
                country_excluded: `Due to restrictions, we do not accept users from this location`,
                passwords_mismatch: `The passwords don't match`,
                tos: `You must accept terms of service`,
                };
                
                const message: string = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid`
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