/** Crea un input de tipo file para obtener un archivo. */
export const uploadFile = () => {
    let file: File;
    
    const fileInput = Object.assign(document.createElement('input'), {
        type: 'file',
        accept: 'image/*',
        style: { display: 'hidden' }
    });

    fileInput.onchange = (e: Event) => {
        file = (e.target as HTMLInputElement).files[0];
    };

    fileInput.click();

    return file;
};
