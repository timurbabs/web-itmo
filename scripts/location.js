const locationParts = document.location.href.split('/')
const locationPage = locationParts[locationParts.length - 1]
const pages = {
  'index.html': 'main-page',
  'about_me.html': 'about-page',
  'hard_skills.html': 'hard-skills-page',
  'soft_skills.html': 'soft-skills-page',
}

const navElement = document.querySelector(`.${pages[locationPage]}`)
navElement.classList.add('active')
