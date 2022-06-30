export default function BotTile({pageData, bot}){
    return (
        <div className="card item">
            <h3 className="title">{bot.name}</h3>
            <p><b>Description:</b> {bot.description}</p>
        </div>
    )
}
