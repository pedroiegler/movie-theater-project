function formatDate(dateString, locale) {
    const [year, month, day] = dateString.split('-');
    
    const date = new Date(`${month}/${day}/${year}`);
    
    if (isNaN(date.getTime())) {
        throw new Error('Data inválida');
    }

    const formatter = new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formatter.format(date);
}

function closeModal(id_modal) {
    let modal = document.getElementById(id_modal);
    modal.close();
}

function openModal(id_modal) {
    let modal = document.getElementById(id_modal);
    modal.showModal();
}