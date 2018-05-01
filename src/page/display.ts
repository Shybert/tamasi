async function addLiInfo (text: string, classAndId?: {id?: string, theClass?: string}): Promise<HTMLElement> {
  try {
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
  } catch (err) {
    console.log('Error while adding info to li:', err)
  }
}

async function hidePages () {
  try {
    const divContent: HTMLElement = document.getElementById('content')

    // Loop through the children and set their display value to 'none'
    for (let i = 0; i < divContent.children.length; i += 1) {
      (divContent.children[i] as HTMLElement).style.display = 'none' // eslint-disable-line no-undef
    }
  } catch (err) {
    console.log('Error while hiding pages:', err)
  }
}

async function formatTime (milliseconds: number): Promise<string> {
  try {
    console.log('Formatting time')

    // Convert milliseconds to date format to get hours, minutes etc.
    const millisecondsDate: Date = new Date(milliseconds)

    // Convert date to relevant time, then pad it with leading zeroes
    const hours: string = Math.floor(milliseconds / 3600000).toString().padStart(2, '0')
    const minutes: string = (millisecondsDate.getUTCMinutes()).toString().padStart(2, '0')
    const seconds: string = (millisecondsDate.getUTCSeconds()).toString().padStart(2, '0')
    const formattedMilliseconds: string = (millisecondsDate.getUTCMilliseconds()).toString().padStart(3, '0')

    // Append times together and add seperators
    const formattedTime: string = `${hours}:${minutes}:${seconds}.${formattedMilliseconds}`

    return formattedTime
  } catch (err) {
    console.error('Error while formatting time:', err)
  }
}

export {addLiInfo, hidePages, formatTime}
