import PropTypes from 'prop-types';

function Card({icon, title, value, style}) {
    return (  
        <div className="col-xl-3 col-md-6 col-lg-6 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div>
                        <div className={`icon-wrap ${style} mb-4`}>
                            {icon}
                        </div>
                        <h1 className="text-dark font-weight-bold mb-2">{value}</h1>
                        <h6 className="text-dark">{title}</h6>
                        <p className="text-muted">
                            31.82%
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-success ms-1" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                                </svg>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired
};


export default Card;