import { Link } from 'react-router-dom'
import '../styles/notfound.css'

const NotFound = () => {
    return (
        <div id="colorlib-notfound">
            <div className="colorlib-notfound">
                <div className="colorlib-notfound-404">
                    <h1>404</h1>
                    <h2 id="colorlib_404_customizer_page_heading">Page Not Found</h2>
                </div>
                <Link to="/" id="colorlib_404_customizer_button_text">กลับไปหน้าแรก</Link>
            </div>
        </div>
    )
}

export default NotFound
