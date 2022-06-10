export default function MainHeader({pageData}){
    const user = pageData && pageData.user;
    return (
        <header>
            <div className="container header-wrap">
                <div className="header-column logo-wrap">
                </div>
                <div className="header-column menu-wrap">
                    Seja bem-vindo {user && user.firstName}
                </div>
            </div>
        </header>
    );
}
