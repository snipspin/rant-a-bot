document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelectorAll('.collapsible');
    var modals = document.querySelectorAll('.modal');
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    M.Collapsible.init(elems, 'accordion');
    M.Modal.init(modals);
});