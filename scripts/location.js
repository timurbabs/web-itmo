const page = document.location.href.split('/')[3]

const pages = {
  'index': 'main-page',
  'about_me': 'about-page',
  'hard_skills': 'hard-skills-page',
  'soft_skills': 'soft-skills-page',
}

const navElement = document.querySelector(`.${pages[page]}`)
navElement.classList.add('active')
