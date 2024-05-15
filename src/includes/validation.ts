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

export default {
    install (app: any) {
        app.component("VeeForm", VeeForm);
        app.component("VeeFfield", VeeField);
        app.component("VeeErrorMessage", VeeErrorMessage)
    }
}