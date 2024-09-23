const dateTransform = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    })
}

export default dateTransform