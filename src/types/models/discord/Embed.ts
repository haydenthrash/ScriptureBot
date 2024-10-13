import { Author } from "./Author"
import { Field } from "./Field"

export type Embed = {
    color: number,
    author: Author,
    title: string,
    fields: Field[]
}