import {toast} from "tailwind-toast";

export function Toast(message) {
    toast()
        .warning('info', message)
        .with({
            shape: 'pill',
            duration: 2000,
            speed: 1000,
            positionX: 'end',
            positionY: 'bottom',
            color: 'bg-green-500',
            fontColor: 'white',
            fontTone: 50
        }).show();
}
