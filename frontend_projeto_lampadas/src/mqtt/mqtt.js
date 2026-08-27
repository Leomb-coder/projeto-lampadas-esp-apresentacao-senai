import mqtt from "mqtt";

const BROKER = "wss://broker.hivemq.com:8884/mqtt";

const PREFIXO = "senai/leomb/";

export const client = mqtt.connect(BROKER);

export const topicos = {
    cozinha: PREFIXO + "cozinha",
    sala: PREFIXO + "sala",
    quarto1: PREFIXO + "quarto1",
    quarto2: PREFIXO + "quarto2",
    piscar: PREFIXO + "piscar",   // NOVO
};

export function ligarLampada(comodo) {
    client.publish(topicos[comodo], "ON");
}

export function desligarLampada(comodo) {
    client.publish(topicos[comodo], "OFF");
}

export function alternarLampada(comodo, estadoAtual) {
    client.publish(
        topicos[comodo],
        estadoAtual ? "OFF" : "ON"
    );
}

export function alternarPiscar(estadoAtual) {
    client.publish(
        topicos.piscar,
        estadoAtual ? "OFF" : "ON"
    );
}