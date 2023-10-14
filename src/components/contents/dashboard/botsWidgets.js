import {useState, useContext, useEffect} from 'react';
import SectionHeader from '../../headers/sectionHeader';
import PaginationTable from '../../displays/paginationTable';
import IconButtonConfig from '../../../models/IconButtonConfig';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import TocIcon from '@mui/icons-material/Toc';
import PageDataContext from '../../../context/pageData';
import CardSlider from '../../sliders/card-slider';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StoreIcon from '@mui/icons-material/Store';

export default function BotsWidgets({myBots}) {
    const [myBotsView, setMyBotsView] = useState('carousel');
    const [botStoreView, setBotStore] = useState('table');
    const {pageData} = useContext(PageDataContext);
    
    useEffect(() => {
        const localMyBotsView = window.localStorage.getItem(localStorageWidgetViewName('myBots'));
        const localBotStoreView = window.localStorage.getItem(localStorageWidgetViewName('botStore'));

        localMyBotsView && setMyBotsView(localMyBotsView)
        localBotStoreView && setBotStore(localBotStoreView)
    }, [pageData]);

    function localStorageWidgetViewName(viewName) {
        return `${pageData?.user?._id}_widgetView_${viewName}`
    }

    function handleViewClick(viewName, value) {
        let getter;
        let setter;

        switch (viewName) {
            case 'myBots': {
                getter = myBotsView;
                setter = setMyBotsView;
                break;
            }
            case 'botStore': {
                getter = botStoreView;
                setter = setBotStore;
                break;
            }
            default: return;
        }

        window.localStorage.setItem(localStorageWidgetViewName(viewName), value);
        return setter(value);
    }

    function handleBotClick(e, _id) {
        window.open(createURL('/bot-details', { bot: _id }), '_self');
    }

    return (
        <section className="bots-widgets grid columns-2 no-padding">
            <div className="widget item no-padding">
                <SectionHeader title="Meus robôs" Icon={SmartToyIcon} iconButtons={[
                    new IconButtonConfig({
                        id: Math.random(),
                        display: myBotsView !== 'carousel',
                        Icon: ViewCarouselIcon,
                        action: () => handleViewClick('myBots', 'carousel')
                    }),
                    new IconButtonConfig({
                        id: Math.random(),
                        display: myBotsView !== 'table',
                        Icon: TocIcon,
                        action: () => handleViewClick('myBots', 'table')
                    })
                ]}/>

                {myBotsView === 'carousel' && <CardSlider data={myBots} />}
                {myBotsView === 'table' && <PaginationTable
                    defaultData={myBots}
                    columns={[
                        { id: 'name', label: 'BOT NAME'},
                        { id: 'description', label: 'DESCRIPTION'}
                    ]}
                    rowsPerPage={5}
                    rowsPerPageOptions={[5, 10, 50, 100]}
                    handleRowClick={handleBotClick}
                    pointerCursor={true}
                />}
            </div>
            <div className="widget item no-padding">
                <SectionHeader title="Bot Store" Icon={StoreIcon} iconButtons={[
                    new IconButtonConfig({
                        id: Math.random(),
                        display: botStoreView !== 'carousel',
                        Icon: ViewCarouselIcon,
                        action: () => handleViewClick('botStore', 'carousel')
                    }),
                    new IconButtonConfig({
                        id: Math.random(),
                        display: botStoreView !== 'table',
                        Icon: TocIcon,
                        action: () => handleViewClick('botStore', 'table')
                    })
                ]}/>

                {botStoreView === 'carousel' && <CardSlider data={myBots} />}
                {botStoreView === 'table' && <PaginationTable
                    defaultData={myBots}
                    columns={[
                        { id: 'name', label: 'BOT NAME'},
                        { id: 'description', label: 'DESCRIPTION'}
                    ]}
                    rowsPerPage={5}
                    rowsPerPageOptions={[5, 10, 50, 100]}
                    handleRowClick={handleBotClick}
                    pointerCursor={true}
                />}
            </div>
        </section>
    );
}