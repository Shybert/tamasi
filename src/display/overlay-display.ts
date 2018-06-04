async function selectBoss (direction: 'previous' | 'next'): Promise<void> {
  console.log(`Selecting ${direction} boss`)
  const saveInfoElement: HTMLElement = document.getElementById('saveInfo')
  const activeLi: HTMLElement = document.getElementsByClassName('active')[0] as HTMLElement

  // Remove the active class from the li
  activeLi.classList.remove('active')

  // Check if the active li is the first/last in the list
  if (!activeLi.nextElementSibling && direction === 'next') {
    /* The active li is the last in the list, and direction is next
    so set active on the first element sibling */
    saveInfoElement.firstElementChild.classList.add('active')
    return
  }
  if (!activeLi.previousElementSibling && direction === 'previous') {
    /* The active li is the first in the list, and direction is previous
    so set active on the last element sibling */
    saveInfoElement.lastElementChild.classList.add('active')
    return
  }

  // Now safe to add the active class to next/previous sibling
  if (direction === 'next') {
    activeLi.nextElementSibling.classList.add('active')
  } else if (direction === 'previous') {
    activeLi.previousElementSibling.classList.add('active')
  }
}

export {selectBoss}
