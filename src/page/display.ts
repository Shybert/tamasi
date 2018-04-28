async function addLiInfo (text: string, classAndId?: {id?: string, theClass?: string}): Promise<HTMLElement> {
  const li: HTMLElement = document.createElement('li')

  // Put text into a text node and append it
  const textNode: Text = document.createTextNode(text)
  li.appendChild(textNode)

  if (classAndId) {
    // Check if id is provided and add it
    if (classAndId.id) {
      li.id = classAndId.id
    }
    // Check if class is provided and add it
    if (classAndId.theClass) {
      li.classList.add(classAndId.theClass)
    }
  }

  return li
}

async function hidePages () {
  const divContent: HTMLElement = document.getElementById('content')

  // Loop through the children and set their display value to 'none'
  for (let i = 0; i < divContent.children.length; i += 1) {
    (divContent.children[i] as HTMLElement).style.display = 'none' // eslint-disable-line no-undef
  }
}

export {addLiInfo, hidePages}
