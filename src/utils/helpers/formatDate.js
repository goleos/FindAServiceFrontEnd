export default function formatDate(date) {
    if (!date) return 'No Date'

    const options = { year: 'numeric', month: 'short', day: 'numeric' }

    return new Date(date).toLocaleDateString('en-UK', options);
}