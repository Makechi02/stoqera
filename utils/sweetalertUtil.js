import Swal from "sweetalert2";

export const showConfirmDialog = (message, action) => {
    Swal.fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            action();
        }
    });
}
