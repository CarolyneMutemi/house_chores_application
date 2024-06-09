import Swal from 'sweetalert2'

export function requestSend(service, provider_name) {
    let isPending = false
    let isConfirmed = false
    return new Promise((resolve) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are sending a ${service} request to ${provider_name}.`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, send away!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Request send!",
                text: "Request has been send, await confirmation. Don't refresh!",
                icon: "success"
              });
              isPending = true
              resolve({isPending, isConfirmed})
            } else {
              resolve({isPending, isConfirmed})
            }
          });
    })
}

export function simulateAcceptedRequest(service, provider_name) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
                },
                buttonsStyling: true
              });
              swalWithBootstrapButtons.fire({
                title: `Confirm ${service} service offer by ${provider_name}.`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, I confirm!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire({
                    title: "Confirmed!",
                    text: "The chore has been added.",
                    icon: "success"
                  });
                  resolve(true)
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "The service has been aborted!",
                    icon: "error"
                  });
                  resolve(false)
                }
              });
        }, 3000)
    })
}


export async function addChore(session_id, service_id, provider_id) {

  const data = {service_id, provider_id, date: 'Tuesday'}
  try {
    const response = await fetch(`http://localhost:5000/create_chore/${session_id}`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    
    if (!response.ok){
      throw Error(response.status)
    }
  }catch (error) {
    console.log(error)
  }
}
