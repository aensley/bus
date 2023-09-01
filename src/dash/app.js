import $ from 'jquery'
import 'datatables.net-bs5'
import { Modal } from 'bootstrap'
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faTrashCan, faPlay } from '@fortawesome/free-solid-svg-icons'

const publicDomain = '{{public-domain}}'
library.add(faTrashCan, faPlay)

const play = icon({ prefix: 'fas', iconName: 'play' }).html
const trashCan = icon({ prefix: 'fas', iconName: 'trash-can' }).html
let $copyMessage
let $status
let deleteConfirmation
let $deleteConfirmButton
let $deleteConfirmShort
let $deleteConfirmLong
let $copiedUrl
let listTable
let $shortRow
let dcModal

const setStatus = (data) => {
  console.log(data)
  const classes = 'p-4 fw-bold fs-5 text-center text-light bg-' + (data.status === 'success' ? 'success' : 'danger')
  $status.removeClass().addClass(classes).text(data.message).show()
  if (data.action === 'create' && data.short) {
    $status.append(
      '<p class="mt-3 mb-0">Click to copy: <a href="https://' +
        publicDomain +
        '/' +
        data.short +
        '" title="Copy Short URL" class="copy link-light me-1">' +
        publicDomain +
        '/' +
        data.short +
        '</a></p>'
    )
  }

  setTimeout(
    () => {
      $status.fadeOut()
    },
    data.status === 'success' ? 5000 : 15000
  )
}

const setSelectors = () => {
  $copyMessage = $('#copyMessage')
  $copiedUrl = $('#copiedUrl')
  $status = $('#status')
  $deleteConfirmButton = $('#deleteConfirmButton')
  deleteConfirmation = document.getElementById('deleteConfirmation')
  $deleteConfirmShort = $('#deleteConfirmShort')
  $deleteConfirmLong = $('#deleteConfirmLong')
  $shortRow = $('#shortRow')
  dcModal = new Modal(deleteConfirmation)
  dcModal.hide()
  deleteConfirmation.addEventListener('shown.bs.modal', function () {
    $deleteConfirmButton.focus()
  })
}

const getShortUrlA = (short, copy) => {
  return (
    '<a' +
    (copy ? ' title="Copy Short URL"' : '') +
    ' class="btn btn-secondary' +
    (copy ? ' copy' : '') +
    ' text-nowrap" href="https://' +
    publicDomain +
    '/' +
    short +
    '">' +
    short +
    '</a>'
  )
}

const getLongUrlA = (long, copy) => {
  return '<a' + (copy ? ' class="copy" title="Copy Long URL"' : '') + ' href="' + long + '">' + long + '</a>'
}

const handleCopyClick = function (e) {
  e.preventDefault()
  e.stopPropagation()
  e.stopImmediatePropagation()
  const url = $(this).prop('href')
  $copiedUrl.text(url)
  navigator.clipboard.writeText(url)
  $copyMessage.css('display', 'flex')
  setTimeout(() => {
    $copyMessage.fadeOut()
  }, 1500)
  return false
}

const handleFormSubmit = (e) => {
  e.preventDefault()
  $.ajax({
    url: 'create',
    method: 'POST',
    dataType: 'json',
    data: {
      s: $('#short').val(),
      l: $('#long').val()
    }
  })
    .done((d) => {
      setStatus(d)
      updateTable()
    })
    .fail((d) => {
      setStatus(JSON.parse(d.responseText))
    })
}

const updateTable = () => {
  listTable.ajax.reload()
}

const handleDeleteClick = function () {
  const data = listTable.row($(this).parents('tr')[0]).data()
  $deleteConfirmShort.html(getShortUrlA(data.s, false))
  $deleteConfirmLong.html(getLongUrlA(data.l, false))
  dcModal.show()
  $deleteConfirmButton.data('short', data.s)
}

const handleConfirmDeleteClick = function () {
  dcModal.hide()
  $.ajax({
    url: 'delete',
    method: 'POST',
    dataType: 'json',
    data: { s: $(this).data('short') }
  })
    .done((d) => {
      setStatus(d)
      updateTable()
    })
    .fail((d) => {
      setStatus(JSON.parse(d.responseText))
    })
}

const setupDataTable = () => {
  listTable = $('#list').DataTable({
    ajax: 'read',
    columns: [{ data: 's' }, { data: 'l' }, { data: 'c' }],
    columnDefs: [
      {
        targets: 0,
        className: 'text-nowrap',
        render: (data, type) => {
          if (type === 'display') {
            return getShortUrlA(data, true)
          }

          return data
        }
      },
      {
        targets: 1,
        className: 'dt-overflow align-middle',
        render: (data, type) => {
          if (type === 'display') {
            return '<span>' + getLongUrlA(data, true) + '</span>'
          }

          return data
        }
      },
      {
        targets: 2,
        className: 'd-none d-md-table-cell text-nowrap align-middle text-center',
        render: (data, type) => {
          if (type === 'display') {
            return new Date(data * 1000).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
          }

          return data
        }
      },
      {
        targets: 3,
        className: 'text-center text-nowrap',
        data: null,
        defaultContent:
          '<button class="btn btn-danger text-nowrap" title="Delete">' +
          trashCan +
          '<span class="d-none d-lg-inline-block ms-2">Delete</span></button>'
      }
    ],
    deferRender: true,
    dom: 'frtip',
    lengthMenu: [5, 10, 25, 50, 100],
    pageLength: 5
  })

  $('#list tbody').on('click', 'button', handleDeleteClick)
}

window.addEventListener('load', () => {
  $('button[type="submit"]').html(play)
  setSelectors()
  $('#addForm').on('submit', handleFormSubmit)
  $('#customShort').on('change', () => {
    $shortRow.toggleClass('d-none')
  })
  $('main').on('click', 'a.copy', handleCopyClick)
  $deleteConfirmButton.prepend(trashCan).on('click', handleConfirmDeleteClick)
  setupDataTable()
})
