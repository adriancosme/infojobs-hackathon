import { ICheckDescription } from "@/models/CheckDescription.model";

export function analizeDescription(url: string, { arg }: {arg: ICheckDescription}) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg),
    }).then(response => response.json())
        .catch(error => console.error(error));
}