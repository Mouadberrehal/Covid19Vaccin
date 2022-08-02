 <template>
        <section>

			<b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            animation="slide"
            	v-model="isOpen">
            	<template #trigger>
            	    <div
            	        class="panel-heading is-primary is-light"
            	        role="button"
            	        aria-controls="contentIdForA11y2">
            	        <strong class="title has-text-weight-semibold"> Inscription </strong>
            	    </div>
            	</template>
            	<div class="box">
					<b-collapse
            	    	class="card"
            	    	animation="slide"
            	    	v-for="(collapse, index) of collapses"
            	    	:key="index"
            	    	:open="isOpen == index"
            	    	@open="isOpen = index">
            	    	<template #trigger="props">
            	    	    <div
            	    	        class="card-header"
            	    	        role="button">
            	    	        <p class="card-header-title">
            	    	            <span class="subtitle is-4" v-html="collapse.title"/>
            	    	        </p>
            	    	        <a class="card-header-icon">
            	    	            <b-icon
            	    	                :icon="props.open ? 'menu-down' : 'menu-up'">
            	    	            </b-icon>
            	    	        </a>
            	    	    </div>
            	    	</template>
            	    	<div class="card-content">
            	    	    <div class="content is-medium">
            	    	        <span v-html="collapse.text"/>
            	    	    </div>
            	    	</div>
            		</b-collapse>
            	</div>
        	</b-collapse>

			<b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            animation="slide"
            	v-model="isOpen">
            	<template #trigger>
            	    <div
            	        class="panel-heading is-primary is-light"
            	        role="button"
            	        aria-controls="contentIdForA11y2">
            	        <strong class="title has-text-weight-semibold"> Fonctionnement </strong>
            	    </div>
            	</template>
            	<div class="box">
					<b-collapse
            	    	class="card"
            	    	animation="slide"
            	    	v-for="(collapse, index) of fonctionnement"
            	    	:key="index"
            	    	:open="isOpen == index"
            	    	@open="isOpen = index">
            	    	<template #trigger="props">
            	    	    <div
            	    	        class="card-header"
            	    	        role="button">
            	    	        <p class="card-header-title">
            	    	            <span class="subtitle is-4" v-html="collapse.title"/>
            	    	        </p>
            	    	        <a class="card-header-icon">
            	    	            <b-icon
            	    	                :icon="props.open ? 'menu-down' : 'menu-up'">
            	    	            </b-icon>
            	    	        </a>
            	    	    </div>
            	    	</template>
            	    	<div class="card-content">
            	    	    <div class="content is-medium">
            	    	        <span v-html="collapse.text"/>
            	    	    </div>
            	    	</div>
            		</b-collapse>
            	</div>
        	</b-collapse>

			<b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            animation="slide"
            	v-model="isOpen">
            	<template #trigger>
            	    <div
            	        class="panel-heading is-primary is-light"
            	        role="button"
            	        aria-controls="contentIdForA11y2">
            	        <strong class="title has-text-weight-semibold"> Vaccins </strong>
            	    </div>
            	</template>
            	<div class="box">
					<b-collapse
            	    	class="card"
            	    	animation="slide"
            	    	v-for="(collapse, index) of vaccins"
            	    	:key="index"
            	    	:open="isOpen == index"
            	    	@open="isOpen = index">
            	    	<template #trigger="props">
            	    	    <div
            	    	        class="card-header"
            	    	        role="button">
            	    	        <p class="card-header-title">
            	    	            <span class="subtitle is-4" v-html="collapse.title"/>
            	    	        </p>
            	    	        <a class="card-header-icon">
            	    	            <b-icon
            	    	                :icon="props.open ? 'menu-down' : 'menu-up'">
            	    	            </b-icon>
            	    	        </a>
            	    	    </div>
            	    	</template>
            	    	<div class="card-content">
            	    	    <div class="content is-medium">
            	    	        <span v-html="collapse.text"/>
            	    	    </div>
            	    	</div>
            		</b-collapse>
            	</div>
        	</b-collapse>

			<b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            animation="slide"
            	v-model="isOpen">
            	<template #trigger>
            	    <div
            	        class="panel-heading is-primary is-light"
            	        role="button"
            	        aria-controls="contentIdForA11y2">
            	        <strong class="title has-text-weight-semibold">Données Personnelles</strong>
            	    </div>
            	</template>
            	<div class="box">
					<b-collapse
            	    	class="card"
            	    	animation="slide"
            	    	v-for="(collapse, index) of Données_personnelles"
            	    	:key="index"
            	    	:open="isOpen == index"
            	    	@open="isOpen = index">
            	    	<template #trigger="props">
            	    	    <div
            	    	        class="card-header"
            	    	        role="button">
            	    	        <p class="card-header-title">
            	    	            <span class="subtitle is-4" v-html="collapse.title"/>
            	    	        </p>
            	    	        <a class="card-header-icon">
            	    	            <b-icon
            	    	                :icon="props.open ? 'menu-down' : 'menu-up'">
            	    	            </b-icon>
            	    	        </a>
            	    	    </div>
            	    	</template>
            	    	<div class="card-content">
            	    	    <div class="content is-medium">
            	    	        <span v-html="collapse.text"/>
            	    	    </div>
            	    	</div>
            		</b-collapse>
            	</div>
        	</b-collapse>

			<b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            animation="slide"
            	v-model="isOpen">
            	<template #trigger>
            	    <div
            	        class="panel-heading is-primary is-light"
            	        role="button"
            	        aria-controls="contentIdForA11y2">
            	        <strong class="title has-text-weight-semibold">Vaccinateurs</strong>
            	    </div>
            	</template>
            	<div class="box">
					<b-collapse
            	    	class="card"
            	    	animation="slide"
            	    	v-for="(collapse, index) of vaccinateurs"
            	    	:key="index"
            	    	:open="isOpen == index"
            	    	@open="isOpen = index">
            	    	<template #trigger="props">
            	    	    <div
            	    	        class="card-header"
            	    	        role="button">
            	    	        <p class="card-header-title">
            	    	            <span class="subtitle is-4" v-html="collapse.title"/>
            	    	        </p>
            	    	        <a class="card-header-icon">
            	    	            <b-icon
            	    	                :icon="props.open ? 'menu-down' : 'menu-up'">
            	    	            </b-icon>
            	    	        </a>
            	    	    </div>
            	    	</template>
            	    	<div class="card-content">
            	    	    <div class="content is-medium">
            	    	        <span v-html="collapse.text"/>
            	    	    </div>
            	    	</div>
            		</b-collapse>
            	</div>
        	</b-collapse>
			<div class="level-item">
				<h1 class="title has-text-weight-normal has-text-centered is-4 mb-5">
					Si certaines de vos interrogations restent sans réponses, contactez nous par mail à <b>contact@dernieredose.org</b>
				</h1>
			</div>
            <div class="level mb-5 mt-1">
                <div class="level-item">
                    <b-button
                        type="is-primary"
                        v-hotkey="keymap"
                        @click="home"
                    >
                        {{ $t("home") }}
                    </b-button>
                </div>
            </div>
        </section>
 </template>

<script lang="ts">
import store from "@/store";
import { Component, Prop, Model, Emit } from "vue-property-decorator";
import Base from "@/components/Base.vue";

@Component<FAQ>({})
export default class FAQ extends Base {
    get keymap() {
        return { enter: this.home };
    }

    private home() {
        this.$router.push({ name: "main" });
    }
    data() {
        return {
            collapses: [
                {
                    title: 'Peut-on s’inscrire à plusieurs avec un même numéro de téléphone ?',
                    text: 'Le numéro de téléphone est l’identifiant du candidat, il correspond donc à un seul candidat à un moment donné. Après une première dose pour le premier candidat, vous pouvez utiliser ce même numéro pour un autre candidat.'
                },
                {
                    title: 'Je n’ai pas les conditions requises pour le vaccin, puis-je tout de même m’inscrire ?',
                    text: 'Oui ! dernieredose.org laisse aux vaccinateurs le choix des conditions de vaccination lors de la déclaration de doses disponibles.'
                },
                {
                    title: 'Puis-je bénéficier d’une deuxième dose si j’ai déjà reçu ma première dose grâce à dernieredose.org ?',
                    text: 'Oui, suite à une première dose, vous recevrez un SMS auquel il vous sera demandé si vous souhaitez être notifié plus tard dans le cadre de votre deuxième dose.'
                },
            ],
			fonctionnement: [
		        {
                    title: 'Comment fonctionne la sélection des candidats ?',
                    text: 'L’algorithme prend en compte, lors d’une déclaration de doses, les paramètres suivants : <ul><li>-La distance entre le candidat et le vaccinateur</li> <li>-Si le candidat a répondu aux dernières propositions de dose</li> <li>-L’ancienneté de l’inscription</li>'
                },
				{
					title: 'Par quel moyen vais-je être contacté ?',
					text: 'Si une dose de vaccin est disponible, nous vous enverrons un SMS pour vous la proposer.<br> Si vous répondez positivement à la proposition, nous vous transmettrons les informations nécessaires pour vous rendre sur le lieu de la vaccination.'
				},
				{
					title: 'Je suis inscrit depuis plusieurs semaines et je n’ai jamais été notifié pour une vaccination.',
					text: 'La réception d’une proposition de dose dépend de plusieurs paramètres : votre proximité géographique avec des vaccinateurs ayant des doses disponibles mais également le fait d’avoir répondu aux précédentes propositions. Nous ne garantissons donc pas de pouvoir contenter tous les candidats à la vaccination.'
				},
				{
					title: 'Puis-je me faire vacciner grâce à dernieredose.org pour ma seconde injection ?',
					text: 'Oui, il n’y a pas de différence entre les deux doses pour dernieredose.org.'
				},
				{
					title: 'Je me suis fait vacciner et je veux me désinscrire.',
					text: 'Afin de vous désinscrire à tout moment, il vous suffit d’envoyer “STOP” au 0755536248. Ce numéro est également utilisé pour la validation de votre inscription ainsi que pour les notifications de doses disponibles.'
				},
				{
					title: 'Pourquoi votre application alors qu’il existe déjà des autres sites comme covidliste ?',
					text: 'Toutes les bonnes volontés sont bonnes à prendre, nous avons eu beaucoup de demandes de médecins et de pharmaciens pour les aider à faciliter l’accès aux candidats à la vaccination, nous avons donc répondu à ces demandes. Alors que covidliste est plutôt destiné aux centres de vaccinations, Dernieredose s’adresse aux professionnels de santé libéraux avec des fonctions spécifiques comme l’aide au lancement de la campagne de vaccination sur leur patientièle.'
				},
				{
					title: 'La vaccination pour tous : vous ne respectez donc pas les prescriptions d’âge imposées par le gouvernement ?',
					text: 'Nous répondons à la difficulté de trouver des candidats pour des doses qui risquent d’être perdues, et dans ce cadre il est toléré que tout candidat indépendamment de son age soit vacciné. Par ailleurs nous anticipons l’ouverture prochaine à la vaccination de tout Français sans critère d’âge.'
				}
			],
			vaccins: [
				{
					title: 'Quel type de vaccin va-t-on m’administrer ?',
					text: 'Lorsque vous recevrez un SMS de proposition de dose, il y sera précisé le type de vaccin.'
				},
				{
					title: 'J’ai une préférence pour un type de vaccin, puis-je choisir ?',
					text: 'dernieredose.org ne vous permet pas d’exprimer un choix de vaccin lors de l’inscription mais lorsque vous recevrez un SMS de proposition de dose, il y sera précisé le type de vaccin.'
				},
				{
					title: 'J’ai une pathologie particulière qui m’interdit un type de vaccin, puis-je l’indiquer ?',
					text: 'Nous ne récoltons pas d\'informations concernant les pathologies des candidats.<br>Lorsque vous recevrez un SMS de proposition de dose, il y sera précisé le type de vaccin et vous aurez la possibilité d’accepter ou non.'
				}
			],
			Données_personnelles: [
				{
					title: 'Je me suis inscrit mais je souhaite modifier mon numéro de téléphone ?',
					text: 'Si vous êtes candidat et vous souhaitez modifier votre numéro de téléphone, je vous invite à envoyer “stop” au 0755536248 (également utilisé pour la validation de votre inscription ainsi que pour les notifications de dose disponibles) et de vous ré-inscrire avec votre nouveau numéro.'
				},
				{
					title: 'Peut-on changer son code postal ?',
					text: 'Oui, il est possible de changer sa localisation (car déménagement ou long séjour en dehors du domicile) en se ré-inscrivant avec le même numéro de téléphone et en changeant son code postal. La localisation sera alors modifiée dans nos bases de données. Nous vous conseillons de ne changer votre code postal que si vous changez d’adresse sur une longue période ou bien définitivement.',
				},
				{
					title: 'Peut-on changer la date de naissance ?',
					text: 'Si vous êtes candidat et que vous souhaitez modifier votre date de naissance, il vous suffit de vous réinscrire sur dernieredose.org avec le même numéro de téléphone et d’indiquer la nouvelle date.',
				},
				{
					title: 'Je me suis inscrit et je souhaite supprimer mes données (pour un candidat) ?',
					text: 'Si vous souhaitez vous désinscrire il vous suffit d’envoyer “STOP” à tout moment au 0755536248. Ce numéro est également utilisé pour la validation de votre inscription ainsi que pour les notifications de dose disponibles',
				},
				{
					title: 'Comment sont utilisées les informations demandées au candidat ?',
					text: '<ul><li>La date de naissance peut être utilisée par le vaccinateur s’il souhaite restreindre les conditions de vaccination.</li> <li>Le code postal est demandé pour sélectionner les candidats selon la distance entre le domicile et le vaccinateur.</li><li>Le numéro de téléphone est utilisé pour prévenir le candidat par SMS qu’une dose est disponible.</li><br>Les seules informations personnelles partagées avec le vaccinateur après validation du rdv par le candidat est le numéro de téléphone.',
				},
				{
					title: 'Pendant combien de temps les données du candidat sont-elles stockées ?',
					text: 'A tout moment les candidats peuvent se désinscrire, ce qui conduit à la suppression des données, en envoyant “STOP” au 0755536248. Ce numéro est également utilisé pour la validation de votre inscription ainsi que pour les notifications de doses disponibles.',
				}
			],
			vaccinateurs: [
				{
					title: 'Je suis un professionnel de santé en charge de la vaccination. Que m’apporte dernieredose.org ?',
					text: 'Le service a été conçu pour éviter d’avoir à trouver vous-mêmes des candidats à la vaccination, surtout dans le cas de la disponibilité non prévue de doses. C’est dernieredose.org qui notifie automatiquement les candidats et vous recevez les numéros de téléphones des candidats qui ont répondu favorablement à votre proposition de vaccination.',
				},
				{
					title: 'Combien ça me coûte ?',
					text: 'dernieredose.org n’impose aucune contribution financière que ce soit aux candidats à la vaccination ou aux vaccinateurs. Cependant, la mise en place et la maintenance de ce service engendre des coûts, nous vous invitons donc à <a href="/nous-soutenir"/> nous soutenir.',
				}
			]
        }
    }
}
</script>

<i18n>
{
    "fr": {
        "title": "FAQ",
        "body": "Le contenu peut être en <strong>html</strong>.",
        "home": "Retour à l'accueil"
    },
    "en": {
        "title": "FAQ",
        "body": "You can put some <strong>html</strong> here.",
        "home": "Back to home"
    }
}
</i18n>
