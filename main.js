const main = $('main')

const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'

// Request for top story IDs
const makeHttpRequest = async () => {
    const httpResponse = await fetch(url)
    const topStoryIDs = await httpResponse.json()
    return topStoryIDs
}

// Request for story ID data
const storyRequest = async element => {
    const storyUrl = `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
    const httpResponse = await fetch(storyUrl)
    const storyData = await httpResponse.json()
    return storyData
}

const getTopStoryID = async () => {
    const topStoryIDs = await makeHttpRequest()
    topStoryIDs.forEach(async element => {
        const storyData = await storyRequest(element)
        const title = $(`
            <div class="links">
                <ul>
                    <li><a href="${storyData.url}">${storyData.title}</a></li>
                    <p>${storyData.score} points. By: ${storyData.by}. ${storyData.descendants} comments</p>
                </ul>
            </div>
        `)
        main.append(title)
        console.log(storyData)
    })
}
getTopStoryID()