export const getFullName = (name: { fname: string | undefined, lname: string | undefined } | undefined) => {
    if (!name) return ''
    return `${name.fname || ''} ${name.lname || ''}`.trim()
}