// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

var GastoEnergia = false;
var refrigerador = false;
var microondas = false;
var clima = false;
var television = false;
var computadora = false;
var videojuegos = false;
var celular = false;
var wattsgastados = 0;

const Saludos = [
    "Hola,",
    "Bienvenido,",
    "Qué onda,",
    ];
    
const deforestacion= [
    'Se estima que dentro de 100 años no habrá más selvas tropicales en la tierra. Si quieres más datos acerca de esto puedes decir, dime un dato sobre deforestación',
    'La tasa de deforestación equivale a una pérdida de 20 campos de fútbol por minuto. ¿Quieres conocer otros datos? Me lo puedes pedir diciendo, quiero conocer sobre deforestación',
    'Se espera que hasta 28,000 especies se extingan para el próximo cuarto de siglo debido a la deforestación. Si quieres más datos acerca de esto puedes decir, dime un dato sobre deforestación',
    '1 árbol proporciona oxígeno para que respiren 3 personas al día. Por eso los bosques son los pulmones del planeta. ¿Quieres conocer otros datos? Me lo puedes pedir diciendo, quiero conocer sobre deforestación',
    '1.600 millones de personas en todo el mundo dependen de los recursos forestales para su subsistencia. Si quieres más datos acerca de esto puedes decir, dime un dato sobre deforestación',
    ];

const electricidad= [
    "Mas del 50 porciento de la energía que usamos diariamente no es renovable. Puedes preguntarme más cosas sobre la electricidad, o bien, puedes empezar un test para conocer cuanta energía usas al día. Solo tienes que decir, ¿cuánta energía gasto?",
    "En un partido de 90 minutos se gastan aproximadamente 25000000 vatios. Puedes pedirme más datos, o si no sabes cuanto equivale un vatio solo pregúntame, ¿a cuánto equivale un vatio?",
    "En el mundo más de 1000 millones de personas viven sin electricidad. Si quieres conocer más datos similares di, quiero conocer sobre la electricidad",
    ];

const agua= [
    "Sabías que el 70 por ciento de nuestro planeta es agua, y tan solo el 0.002 por ciento es potable, esa es una de las grandes razones por las cuales hay que cuidar el agua. ¿Te gustaría saber más sobre esto? Solo di, quiero saber la importancia del agua",
    "Solo el 33 por ciento de la población mundial tiene acceso al servicio de agua potable. ¿Quieres seguir conociendo datos interesantes? Solo tienes que decir, hablame sobre el agua",
    "Sabías que se calcula que 3,4 millones de personas mueren al año por enfermedades relacionadas con el agua. ¿Te gustaría saber más sobre esto? Solo di, quiero saber la importancia del agua",
    "Se calcula que cada estadounidense consume 575 litros de agua por habitante al día. ¿Quieres seguir conociendo datos interesantes? Solo tienes que decir, hablame sobre el agua",
    "La ONU estima que el 70% de la huella hídrica a nivel mundial está vinculada a la producción de alimentos. ¿Te gustaría saber más sobre esto? Solo di, quiero saber la importancia del agua",
    ];

const todos= [
    'Se estima que dentro de 100 años no habrá más selvas tropicales en la tierra. ¿Quieres saber más al respecto?',
    'La tasa de deforestación equivale a una pérdida de 20 campos de fútbol por minuto. ¿Quieres conocer más?',
    'Se espera que hasta 28,000 especies se extingan para el próximo cuarto de siglo debido a la deforestación. ¿Te gustaría saber más?',
    '1 árbol proporciona oxígeno para que respiren 3 personas al día. Por eso los bosques son los pulmones del planeta. ¿Quieres saber más al respecto?',
    '1.600 millones de personas en todo el mundo dependen de los recursos forestales para su subsistencia. ¿Quieres conocer más?',
    "Mas del 50 porciento de la energía que usamos diariamente no es renovable. Puedes preguntarme más cosas sobre la electricidad, o puedes empezar un test para conocer cuanta energía usas al día. Solo tienes que decirme, ¿cuánta energía gasto?",
    "En un partido de 90 minutos se gastan aproximadamente 25000000 vatios, puedes pedirme mas datos, o si no sabes cuanto equivale un vatio solo pregúntame",
    "En el mundo mas de 1000 millones de personas viven sin electricidad",
    "Sabías que el 70 por ciento de nuestro planeta es agua, y tan solo el 0.002 por ciento es potable, esa es una de las grandes razones por las cuales hay que cuidar el agua.",
    "Solo el 33 por ciento del total de las personas que existen tienen acceso al servicio de agua potable",
    "Sabías que se calcula que 3,4 millones de personas mueren al año por enfermedades relacionadas con el agua",
    "Se calcula que cada estadounidense consume 575 litros de agua por habitante al día",
    "La ONU estima que el 70% de la huella hídrica a nivel mundial está vinculada a la producción de alimentos",
    ];
    
const reforestacion = ["Eliminar subsidios a formas de agricultura que dañan los bosques",
"Invertir en las comunidades indígenas",
"Hablar sobre las causas de la deforestación",
"Demostrar que la conservación de los bosques y el desarrollo económico no son excluyentes",
"Presionar a las grandes compañía para adoptar cadenas sustentables de suministro"];

const menosagua = ["Regar el jardín durante las horas de menor calor para que el agua no se evapore tan fácilmente.",
"Lavar el coche con cubetas y no con manguera.",
"Cerrar los grifos mientras nos enjabonamos, nos afeitamos o nos cepillamos los dientes.",
"Reportar aunque sea la mas minima fuga de agua existente que pueda ver por su casa o a donde vaya",
"Tratar agua residual para convertirla en apta para el riego, bien agrícola o por lo menos para parques y jardines"];

const menoselectricidad = ["Cambiar los focos comunes por unos ahorradores",
"Aprovechar la luz natural",
"Apagar las luces que no se utilizan",
"Utilizar eficientemente el aire acondicionado",
"Usar eficientemente la lavadora y secadora"];

const menostodos = ["Regar el jardín durante las horas de menor calor para que el agua no se evapore tan fácilmente.",
"Lavar el coche con cubetas y no con manguera.",
"Cerrar los grifos mientras nos enjabonamos, nos afeitamos o nos cepillamos los dientes.",
"Tratar agua residual para convertirla en apta para el riego, bien agrícola o por lo menos para parques y jardines.",
"Reportar aunque sea la mas minima fuga de agua existente que pueda ver por su casa o a donde vaya",
"Cambiar los focos comunes por unos ahorradores",
"Aprovechar la luz natural",
"Apagar las luces que no se utilizan",
"Utilizar eficientemente el aire acondicionado",
"Usar eficientemente la lavadora y secadora",
"Eliminar subsidios a formas de agricultura que dañan los bosques",
"Invertir en las comunidades indígenas",
"Hablar sobre las causas de la deforestación",
"Demostrar que la conservación de los bosques y el desarrollo económico no son excluyentes",
"Presionar a las grandes compañía para adoptar cadenas sustentables de suministro"];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = Saludos[Math.floor(Math.random()*Saludos.length)] + ' Me da mucho gusto verte por acá. Nuestro planeta ocupa de tu ayuda para seguir con vida. ¿Quieres saber cómo? Solo menciona deforestación, electricidad, o agua, para conocer impactantes datos sobre estos temas y cómo puedes preservarlos';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const DatosImportantesHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'datosimpactantesIntent';
    },
    handle(handlerInput) {
        var speechOutput='';
        const request = handlerInput.requestEnvelope.request;
        var general = request.intent.slots.general.value;
    switch(general){
        case "agua":
             speechOutput = agua[Math.floor(Math.random()*agua.length)];
            break;
        case "deforestación":
             speechOutput = deforestacion[Math.floor(Math.random()*deforestacion.length)];
            break;
        case "electricidad":
             speechOutput = electricidad[Math.floor(Math.random()*electricidad.length)];
            break;
        default:
            speechOutput = 'por el momento no cuento con esa información, asi que te contaré algo interesante: ' + todos[Math.floor(Math.random()*todos.length)]; + ' recuerda que me puedes preguntar sobre agua, electricidad y deforestación';
            break;
    }
        

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt()
            .getResponse();
    }
};

const AhorroDeRecursosHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AhorroDeRecursos';
    },
    handle(handlerInput) {
        var speechOutput='';
        const request = handlerInput.requestEnvelope.request;
        var MenosRecursos = request.intent.slots.general.value;
    switch(MenosRecursos){
        case "deforestar":
             speechOutput = reforestacion[Math.floor(Math.random()*reforestacion.length)];
            break;
        case "reforestación":
             speechOutput = reforestacion[Math.floor(Math.random()*reforestacion.length)];
            break;
        case "agua":
             speechOutput = menosagua[Math.floor(Math.random()*menosagua.length)];
            break;
        case "electricidad":
             speechOutput = menoselectricidad[Math.floor(Math.random()*menoselectricidad.length)];
            break;
        default:
            speechOutput = 'no te entendí, asi que te dare un dato aleatorio:' +  '' + menostodos[Math.floor(Math.random()*menostodos.length)];
            break;
    }
        

        return handlerInput.responseBuilder
            .speak(`${speechOutput} 'Para saber otro dato curioso puedes decir, dime otro dato`)
            .reprompt('Si quieres saber algún dato interesante puedes decir dime otro dato')
            .getResponse();
    }
};

const AguaGastadaHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AguaGastada';
    },
    handle(handlerInput) {
        var speechOutput='';
        const request = handlerInput.requestEnvelope.request;
        var aguagastada = request.intent.slots.Agua.value;
    switch(aguagastada){
        case "lavandome los dientes":
             speechOutput = 'Cuando una persona se lava los dientes y deja el grifo abierto alrededor de 2 minutos se gastan alrededor de 18 litros de agua.'
            break;
        case "enjuago mis dientes":
             speechOutput = 'Cuando una persona se lava los dientes y deja el grifo abierto alrededor de 2 minutos se gastan alrededor de 18 litros de agua.'
            break;
        case "enjuagar mis dientes":
             speechOutput = 'Cuando una persona se lava los dientes y deja el grifo abierto alrededor de 2 minutos se gastan alrededor de 18 litros de agua.'
            break;
        case "cepillar mis dientes":
             speechOutput = 'Cuando una persona se lava los dientes y deja el grifo abierto alrededor de 2 minutos se gastan alrededor de 18 litros de agua.'
            break;
        case "cepillo mis dientes":
             speechOutput = 'Cuando una persona se lava los dientes y deja el grifo abierto alrededor de 2 minutos se gastan alrededor de 18 litros de agua.'
            break;
        case "lavo mis dientes":
             speechOutput = 'Cuando una persona se lava los dientes y deja el grifo abierto alrededor de 2 minutos se gastan alrededor de 18 litros de agua.'
            break;
        case "lavar los dientes":
             speechOutput = 'Cuando una persona se lava los dientes y deja el grifo abierto alrededor de 2 minutos se gastan alrededor de 18 litros de agua.'
            break;
        case "lavarse los dientes":
             speechOutput = 'Cuando una persona se lava los dientes y deja el grifo abierto alrededor de 2 minutos se gastan alrededor de 18 litros de agua.'
            break;
        case "lavarme los dientes":
             speechOutput = 'Cuando una persona se lava los dientes y deja el grifo abierto alrededor de 2 minutos se gastan alrededor de 18 litros de agua.'
            break;
        case "manguera":
             speechOutput = 'Cuando una persona quiere lavar su coche no escatima la cantidad de agua que usará, y, por ende, se gasta demasiada agua. Al usar una manguera el gasto puede incrementar a  200 y 500 litros dependiendo del tamaño del automovil.'
            break;
        case "grifo":
             speechOutput = 'Cuando una persona quiere descongelar un alimento usando el grifo se consume alrededor de 15 a 25 litros de agua.'
            break;
        case "tinaco":
             speechOutput = 'Un tinaco almacena alrededor de 10 litros de agua.'
            break;
         case "lavadora":
             speechOutput = 'Al momento de usar la lavadora se gasta un total de entre 40 y 80 litros de agua, dependiendo en qué modelo de lavadora se usa.'
            break;
        case "bañera":
             speechOutput = 'Una ducha de 10 minutos consume aproximadamente 200 litros de agua.'
            break;
        case "regadera":
             speechOutput = 'Una ducha de 10 minutos consume aproximadamente 200 litros de agua.'
            break;
        case "inodoro":
             speechOutput = 'Hoy en día los inodoros consumen alrededor de 13 a 23 litros de agua.'
            break;
        case "lavavajillas":
             speechOutput = 'Al usar el lavavajillas usas entre 20 y 40 litros de agua por uso.'
            break;
        default:
            speechOutput = 'Perdón, pero no entendí. Por el momento solo te puedo responder sobre lavadoras, tinacos, bañeras, regaderas, inodoros, lavavajillas, mangueras, y el lavado de dientes' 
            break;
    }
        

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt()
            .getResponse();
    }
};

const ElectricidadGastadaHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ElectricidadGastada';
    },
    handle(handlerInput) {
        GastoEnergia = true;
        const speakOutput = 'Si quieres saber cuanta energia gastas en un dia dime si usas objetos como refrigerador, microondas, clima, televisión, computadora, videojuegos o celular, cuando acabes tu lista di la palabra finalizar';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AguagastaHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.request.Envelope) === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AguaGastada';
    },
}
const ElectrodomesticosHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'Electrodomesticos';
    },
    handle(handlerInput) {
        var speechOutput='';
        const request = handlerInput.requestEnvelope.request;
        var electronicos = request.intent.slots.electronicos.value;
        if (GastoEnergia===false){
            speechOutput = 'Para ver cuanta electricidad gastas tienes que preguntarme cuantos vatios gastas';
        }else{
    switch(electronicos){
        case "refrigerador":
            if(refrigerador===false){
                speechOutput = 'okay';
                refrigerador = true;
            }else{
                speechOutput = 'ya me habias dicho esto, dime otro';
            }
             break;
        case "microondas":
             if(microondas===false){
                speechOutput = 'esta bien';
                microondas = true;
            }else{
                speechOutput = 'eso ya lo habia escuchado, dime otra cosa';
            }
            break;
        case "clima":
             if(clima===false){
                speechOutput = 'hecho';
                clima = true;
            }else{
                speechOutput = 'di otro electrodomestico que este ya lo dijiste';
            }
            break;
        case "television":
             if(television===false){
                speechOutput = 'agregado';
                television = true;
            }else{
                speechOutput = 'este electronico esta repetido, di otro';
            }
            break;
        case "computadora":
             if(computadora===false){
                speechOutput = 'de acuerdo';
                computadora = true;
            }else{
                speechOutput = 'ya dijiste eso, di otra cosa';
            }
            break;
        case "videojuegos":
             if(videojuegos===false){
                speechOutput = 'entendido';
                videojuegos = true;
            }else{
                speechOutput = 'ya lo habias dicho, di otro ';
            }
            break; 
        case "celular":
             if(celular===false){
                speechOutput = 'si';
                celular = true;
            }else{
                speechOutput = 'eso esta repetido, di otro ';
            }
            break;     
        default:
            speechOutput = 'no tenemos ese electronico, solo tenemos: refrigerador, microondas, clima, televison, computadora, videojuegos o celular';
            break;
    }

}
 return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();     
    }
    
};

const FinalizarElectricidadHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'FinalizarElectricidad';
    },
    handle(handlerInput) {
        if(GastoEnergia===true){
        if(refrigerador===true){
            wattsgastados = wattsgastados + 8400
        }
        if(microondas===true){
            wattsgastados = wattsgastados + 1000
        }
        if(clima===true){
            wattsgastados = wattsgastados + 6672
        }
        if(television===true){
            wattsgastados = wattsgastados + 1680
        }
        if(computadora===true){
            wattsgastados = wattsgastados + 7200
        }
        if(videojuegos===true){
            wattsgastados = wattsgastados + 2688
        }
        if(celular===true){
            wattsgastados = wattsgastados + 360
        }
        const speakOutput = 'Excelente, la encuesta ha sido finalizada, resulta que gastas aproximadamente ' + wattsgastados + ' watts diarios, recuerda que puedes pedirme datos impactantes sobre la electricidad, el agua y la deforestación';
        GastoEnergia = false;
        refrigerador = false;
        microondas = false;
        clima = false;
        television = false;
        computadora = false;
        videojuegos = false;
        celular = false;
        wattsgastados = 0;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }else{
          const speakOutput =  'Para poder finalizar la encuesta primero tienes que iniciarla, puedes iniciarla preguntando: ¿Cuantos watts gasto?';
          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
    }
};

const ValorDeVatioHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ValorDeVatio';
    },
    handle(handlerInput) {
        const speakOutput = 'Un vatio o watt equivale a tener encendido un foco incandecente durante 36 segundos, puedes decir deforestacion, electricidad o agua para saber datos sobre cada tema';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ElectricidadGastadaHandler,
        ElectrodomesticosHandler,
        FinalizarElectricidadHandler,
        ValorDeVatioHandler,
        DatosImportantesHandler,
        AhorroDeRecursosHandler,
        AguaGastadaHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();