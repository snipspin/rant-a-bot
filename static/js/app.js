document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.collapsible');
    var modals = document.querySelectorAll('.modal');
    M.Collapsible.init(elems, 'accordion');
    M.Modal.init(modals);
});