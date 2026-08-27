import "./Lampada.css";

function Lampada({ nome, ligada, onClick }) {

    return (
        <div className={`lampada ${ligada ? "ligada" : ""}`}>

            <div className="lampada-info">

                <div className="icone">
                    💡
                </div>

                <div>
                    <h2>{nome}</h2>

                    <p>
                        {ligada ? "Ligada" : "Desligada"}
                    </p>
                </div>

            </div>

            <button onClick={onClick}>
                {ligada ? "Desligar" : "Ligar"}
            </button>

        </div>
    );
}

export default Lampada;