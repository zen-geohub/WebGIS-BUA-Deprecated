export const toggle = () => {
  const sidebar = document.querySelector('.sidebarContainer')
  const toggleButton = document.querySelector('.layercontainerToggle')
  const toggleTitle = document.querySelector('.wrapTitle')
  
  toggleTitle.classList.toggle('closeTitleKP')
  toggleButton.classList.toggle('closeToggle')
  sidebar.classList.toggle('closeSidebar')
}