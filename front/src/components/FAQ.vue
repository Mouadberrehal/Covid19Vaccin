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
            	        <strong class="title has-text-weight-semibold">Donn??es Personnelles</strong>
            	    </div>
            	</template>
            	<div class="box">
					<b-collapse
            	    	class="card"
            	    	animation="slide"
            	    	v-for="(collapse, index) of Donn??es_personnelles"
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
					Si certaines de vos interrogations restent sans r??ponses, contactez nous par mail ?? <b>contact@dernieredose.org</b>
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
                    title: 'Peut-on s???inscrire ?? plusieurs avec un m??me num??ro de t??l??phone ?',
                    text: 'Le num??ro de t??l??phone est l???identifiant du candidat, il correspond donc ?? un seul candidat ?? un moment donn??. Apr??s une premi??re dose pour le premier candidat, vous pouvez utiliser ce m??me num??ro pour un autre candidat.'
                },
                {
                    title: 'Je n???ai pas les conditions requises pour le vaccin, puis-je tout de m??me m???inscrire ?',
                    text: 'Oui ! dernieredose.org laisse aux vaccinateurs le choix des conditions de vaccination lors de la d??claration de doses disponibles.'
                },
                {
                    title: 'Puis-je b??n??ficier d???une deuxi??me dose si j???ai d??j?? re??u ma premi??re dose gr??ce ?? dernieredose.org ?',
                    text: 'Oui, suite ?? une premi??re dose, vous recevrez un SMS auquel il vous sera demand?? si vous souhaitez ??tre notifi?? plus tard dans le cadre de votre deuxi??me dose.'
                },
            ],
			fonctionnement: [
		        {
                    title: 'Comment fonctionne la s??lection des candidats ?',
                    text: 'L???algorithme prend en compte, lors d???une d??claration de doses, les param??tres suivants : <ul><li>-La distance entre le candidat et le vaccinateur</li> <li>-Si le candidat a r??pondu aux derni??res propositions de dose</li> <li>-L???anciennet?? de l???inscription</li>'
                },
				{
					title: 'Par quel moyen vais-je ??tre contact?? ?',
					text: 'Si une dose de vaccin est disponible, nous vous enverrons un SMS pour vous la proposer.<br> Si vous r??pondez positivement ?? la proposition, nous vous transmettrons les informations n??cessaires pour vous rendre sur le lieu de la vaccination.'
				},
				{
					title: 'Je suis inscrit depuis plusieurs semaines et je n???ai jamais ??t?? notifi?? pour une vaccination.',
					text: 'La r??ception d???une proposition de dose d??pend de plusieurs param??tres : votre proximit?? g??ographique avec des vaccinateurs ayant des doses disponibles mais ??galement le fait d???avoir r??pondu aux pr??c??dentes propositions. Nous ne garantissons donc pas de pouvoir contenter tous les candidats ?? la vaccination.'
				},
				{
					title: 'Puis-je me faire vacciner gr??ce ?? dernieredose.org pour ma seconde injection ?',
					text: 'Oui, il n???y a pas de diff??rence entre les deux doses pour dernieredose.org.'
				},
				{
					title: 'Je me suis fait vacciner et je veux me d??sinscrire.',
					text: 'Afin de vous d??sinscrire ?? tout moment, il vous suffit d???envoyer ???STOP??? au 0755536248. Ce num??ro est ??galement utilis?? pour la validation de votre inscription ainsi que pour les notifications de doses disponibles.'
				},
				{
					title: 'Pourquoi votre application alors qu???il existe d??j?? des autres sites comme covidliste ?',
					text: 'Toutes les bonnes volont??s sont bonnes ?? prendre, nous avons eu beaucoup de demandes de m??decins et de pharmaciens pour les aider ?? faciliter l???acc??s aux candidats ?? la vaccination, nous avons donc r??pondu ?? ces demandes. Alors que covidliste est plut??t destin?? aux centres de vaccinations, Dernieredose s???adresse aux professionnels de sant?? lib??raux avec des fonctions sp??cifiques comme l???aide au lancement de la campagne de vaccination sur leur patienti??le.'
				},
				{
					title: 'La vaccination pour tous : vous ne respectez donc pas les prescriptions d?????ge impos??es par le gouvernement ?',
					text: 'Nous r??pondons ?? la difficult?? de trouver des candidats pour des doses qui risquent d?????tre perdues, et dans ce cadre il est tol??r?? que tout candidat ind??pendamment de son age soit vaccin??. Par ailleurs nous anticipons l???ouverture prochaine ?? la vaccination de tout Fran??ais sans crit??re d?????ge.'
				}
			],
			vaccins: [
				{
					title: 'Quel type de vaccin va-t-on m???administrer ?',
					text: 'Lorsque vous recevrez un SMS de proposition de dose, il y sera pr??cis?? le type de vaccin.'
				},
				{
					title: 'J???ai une pr??f??rence pour un type de vaccin, puis-je choisir ?',
					text: 'dernieredose.org ne vous permet pas d???exprimer un choix de vaccin lors de l???inscription mais lorsque vous recevrez un SMS de proposition de dose, il y sera pr??cis?? le type de vaccin.'
				},
				{
					title: 'J???ai une pathologie particuli??re qui m???interdit un type de vaccin, puis-je l???indiquer ?',
					text: 'Nous ne r??coltons pas d\'informations concernant les pathologies des candidats.<br>Lorsque vous recevrez un SMS de proposition de dose, il y sera pr??cis?? le type de vaccin et vous aurez la possibilit?? d???accepter ou non.'
				}
			],
			Donn??es_personnelles: [
				{
					title: 'Je me suis inscrit mais je souhaite modifier mon num??ro de t??l??phone ?',
					text: 'Si vous ??tes candidat et vous souhaitez modifier votre num??ro de t??l??phone, je vous invite ?? envoyer ???stop??? au 0755536248 (??galement utilis?? pour la validation de votre inscription ainsi que pour les notifications de dose disponibles) et de vous r??-inscrire avec votre nouveau num??ro.'
				},
				{
					title: 'Peut-on changer son code postal ?',
					text: 'Oui, il est possible de changer sa localisation (car d??m??nagement ou long s??jour en dehors du domicile) en se r??-inscrivant avec le m??me num??ro de t??l??phone et en changeant son code postal. La localisation sera alors modifi??e dans nos bases de donn??es. Nous vous conseillons de ne changer votre code postal que si vous changez d???adresse sur une longue p??riode ou bien d??finitivement.',
				},
				{
					title: 'Peut-on changer la date de naissance ?',
					text: 'Si vous ??tes candidat et que vous souhaitez modifier votre date de naissance, il vous suffit de vous r??inscrire sur dernieredose.org avec le m??me num??ro de t??l??phone et d???indiquer la nouvelle date.',
				},
				{
					title: 'Je me suis inscrit et je souhaite supprimer mes donn??es (pour un candidat) ?',
					text: 'Si vous souhaitez vous d??sinscrire il vous suffit d???envoyer ???STOP??? ?? tout moment au 0755536248. Ce num??ro est ??galement utilis?? pour la validation de votre inscription ainsi que pour les notifications de dose disponibles',
				},
				{
					title: 'Comment sont utilis??es les informations demand??es au candidat ?',
					text: '<ul><li>La date de naissance peut ??tre utilis??e par le vaccinateur s???il souhaite restreindre les conditions de vaccination.</li> <li>Le code postal est demand?? pour s??lectionner les candidats selon la distance entre le domicile et le vaccinateur.</li><li>Le num??ro de t??l??phone est utilis?? pour pr??venir le candidat par SMS qu???une dose est disponible.</li><br>Les seules informations personnelles partag??es avec le vaccinateur apr??s validation du rdv par le candidat est le num??ro de t??l??phone.',
				},
				{
					title: 'Pendant combien de temps les donn??es du candidat sont-elles stock??es ?',
					text: 'A tout moment les candidats peuvent se d??sinscrire, ce qui conduit ?? la suppression des donn??es, en envoyant ???STOP??? au 0755536248. Ce num??ro est ??galement utilis?? pour la validation de votre inscription ainsi que pour les notifications de doses disponibles.',
				}
			],
			vaccinateurs: [
				{
					title: 'Je suis un professionnel de sant?? en charge de la vaccination. Que m???apporte dernieredose.org ?',
					text: 'Le service a ??t?? con??u pour ??viter d???avoir ?? trouver vous-m??mes des candidats ?? la vaccination, surtout dans le cas de la disponibilit?? non pr??vue de doses. C???est dernieredose.org qui notifie automatiquement les candidats et vous recevez les num??ros de t??l??phones des candidats qui ont r??pondu favorablement ?? votre proposition de vaccination.',
				},
				{
					title: 'Combien ??a me co??te ?',
					text: 'dernieredose.org n???impose aucune contribution financi??re que ce soit aux candidats ?? la vaccination ou aux vaccinateurs. Cependant, la mise en place et la maintenance de ce service engendre des co??ts, nous vous invitons donc ?? <a href="/nous-soutenir"/> nous soutenir.',
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
        "body": "Le contenu peut ??tre en <strong>html</strong>.",
        "home": "Retour ?? l'accueil"
    },
    "en": {
        "title": "FAQ",
        "body": "You can put some <strong>html</strong> here.",
        "home": "Back to home"
    }
}
</i18n>
