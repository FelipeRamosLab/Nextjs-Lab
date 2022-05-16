export default function BotTile({pageData, bot}){
    return (
        <div className="card item">
            <h3 className="title">{bot.name}</h3>
            <p>{bot.description}</p>
        </div>
    )
}
