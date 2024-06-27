let data = [];
let table;

$(document).ready(() => {
  clock();
  table = $("#table").DataTable({ ordering: false });

  $("#login-button").on("click", () => {
    $("#username-label").html($("#username").val());
    $("#login").css("display", "none");
    $("#main").css("display", "block");

    Swal.fire({
      title: "Hi, there!",
      text: `Welcome, ${$("#username").val()}`,
      icon: "success",
      confirmButtonText: "Close",
    });
  });

  $("#insert-data").on("click", () => {
    let nim = $("#insertDataForm #nim").val();
    let nama = $("#insertDataForm #nama").val();
    let alamat = $("#insertDataForm #alamat").val();

    for (let i = 0; i < data.length; i++) {
      if (data[i].nim == nim) {
        Swal.fire({
          title: "Error!",
          text: "NIM sudah ada!",
          icon: "warning",
          confirmButtonText: "Oke",
        });

        break;
      }
    }

    if (nim != "" && nama != "" && alamat != "") {
      data.push({ nim: nim, nama: nama, alamat: alamat });
      $("#tableData").css("display", "block");

      Swal.fire({
        title: "Added!",
        text: "Mahasiswa Baru Telah Ditambahkan!",
        icon: "success",
        confirmButtonText: "Close",
      });

      displayData();
      $("#insertDataForm").trigger("reset");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Mohon lengkapi form!",
        icon: "warning",
        confirmButtonText: "Cool",
      });
    }
  });

  $("#table tbody").on("click", "button.edit-data", function () {
    $("#edit-nim").val("");
    $("#edit-nama").val("");
    $("#edit-alamat").val("");
    const index = $(this).closest("tr").index();
    $("#editIndex").val(index);

    $("#edit-nim").val(data[index].nim);
    $("#edit-nama").val(data[index].nama);
    $("#edit-alamat").val(data[index].alamat);
  });

  $("#update").on("click", function () {
    let nama = $("#edit-nama").val();
    let alamat = $("#edit-alamat").val();
    const index = $("#editIndex").val();

    if (nama && alamat) {
      data[index].nama = nama;
      data[index].alamat = alamat;

      Swal.fire({
        title: "Updated!",
        text: "Data Mahasiswa Berhasil Diupdate!",
        icon: "success",
        confirmButtonText: "Close",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Silakan lengkapi form!",
        icon: "error",
        confirmButtonText: "Close",
      });
    }

    displayData(data);
  });

  $("#table tbody").on("click", "button.delete-data", function () {
    const index = $(this).closest("tr").index();
    data.splice(index, 1);
    displayData();

    Swal.fire({
      title: "Deleted!",
      text: "Data Mahasiswa Berhasil Dihapus!",
      icon: "success",
      confirmButtonText: "Close",
    });
  });

  displayData();
});

const clock = () => {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  $("#clock").html(h + ":" + m + ":" + s);
  setTimeout(clock, 1000);
};

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }

  return i;
}

const displayData = () => {
  table.clear();
  let buttons = `<div class="d-flex"><button type="button" class="edit-data btn btn-sm me-2 text-white btn-info" data-bs-toggle="modal" data-bs-target="#editDataModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
            </svg> 
            Edit
            </button>
            <button type="button" class="btn btn-sm mr-2 btn-danger delete-data"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
              <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
              </svg>
              Hapus
            </button>
            </div>`;

  for (let i = 0; i < data.length; i++) {
    table.row.add([data[i].nim, data[i].nama, data[i].alamat, buttons]);
  }

  table.draw();
};
