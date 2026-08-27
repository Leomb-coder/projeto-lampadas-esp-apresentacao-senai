import { useEffect, useState } from "react";

import Lampada from "./components/Lampada";

import {
    client,
    topicos,
    alternarLampada,
    alternarPiscar
} from "./mqtt/mqtt";

import "./App.css";


function App() {

    const [lampadas, setLampadas] = useState({
        cozinha: false,
        sala: false,
        quarto1: false,
        quarto2: false
    });

    const [piscando, setPiscando] = useState(false);

    const [conectado, setConectado] = useState(false);


    useEffect(() => {

        function conectar() {

            console.log("MQTT conectado");

            setConectado(true);

        }


        function desconectar() {

            console.log("MQTT desconectado");

            setConectado(false);

        }


        function receberMensagem(topic, payload) {

            const mensagem = payload.toString();

            console.log(topic, mensagem);


            let comodo = null;


            if (topic === topicos.cozinha) {
                comodo = "cozinha";
            }

            else if (topic === topicos.sala) {
                comodo = "sala";
            }

            else if (topic === topicos.quarto1) {
                comodo = "quarto1";
            }

            else if (topic === topicos.quarto2) {
                comodo = "quarto2";
            }


            if (comodo) {

                setLampadas((estadoAnterior) => ({
                    ...estadoAnterior,

                    [comodo]: mensagem === "ON"
                }));

            }


            if (topic === topicos.piscar) {

                setPiscando(mensagem === "ON");

            }

        }


        client.on("connect", conectar);

        client.on("offline", desconectar);

        client.on("message", receberMensagem);


        client.subscribe(Object.values(topicos));


        return () => {

            client.off("connect", conectar);

            client.off("offline", desconectar);

            client.off("message", receberMensagem);

        };

    }, []);


    function alternar(comodo) {

        alternarLampada(
            comodo,
            lampadas[comodo]
        );

    }


    function alternarPisca() {

        alternarPiscar(piscando);

    }


    return (

        <div className="app">

            <header>

                <h1>Casa Inteligente</h1>

                <p>
                    Controle das lâmpadas
                </p>

                <div className="status">

                    <span
                        className={
                            conectado
                                ? "status-led conectado"
                                : "status-led"
                        }
                    />

                    {conectado
                        ? "MQTT conectado"
                        : "MQTT desconectado"
                    }

                </div>

                <button
                    className={
                        piscando
                            ? "btn-piscar ativo"
                            : "btn-piscar"
                    }
                    onClick={alternarPisca}
                >
                    {piscando
                        ? "Parar Piscada"
                        : "Piscar Lâmpadas"
                    }
                </button>

            </header>


            <main>

                <Lampada
                    nome="Cozinha"
                    ligada={lampadas.cozinha}
                    onClick={() => alternar("cozinha")}
                />

                <Lampada
                    nome="Sala"
                    ligada={lampadas.sala}
                    onClick={() => alternar("sala")}
                />

                <Lampada
                    nome="Quarto 1"
                    ligada={lampadas.quarto1}
                    onClick={() => alternar("quarto1")}
                />

                <Lampada
                    nome="Quarto 2"
                    ligada={lampadas.quarto2}
                    onClick={() => alternar("quarto2")}
                />

            </main>

        </div>

    );

}


export default App;