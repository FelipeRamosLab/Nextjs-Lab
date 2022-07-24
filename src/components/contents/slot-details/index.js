export default function SlotDetails({ pageData, setPageData }) {
    const {slot} = pageData || {};
    console.log(pageData)

    return (
        <div className="container">
            <section className="content-fullwidth">
                
            </section>

            <section className="content-sidebar">
                <div className="content">
                    <div className="section-wrap">
                        <div className="section-header">
                            <h2>{slot.name}</h2>
                        </div>

                        <div className="card bot-card">
                            <div className="avatar">
                                <h4>AV</h4>
                            </div>
                            <h3 className="title">{slot.bot.name}</h3>
                            <p>{slot.bot.description}</p>
                        </div>

                        {/* Slider here */}
                    </div>

                    <div className="section-header">
                        <h2>Monitor</h2>
                    </div>

                    <div className="section-header">
                        <h2>Posições fechadas</h2>
                    </div>
                </div>

                <div className="sidebar">
                    
                </div>
            </section>
        </div>
    );
}
