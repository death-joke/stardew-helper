import type { VillagerSchedule } from './types'

// Emplois du temps des villageois, extraits du wiki FR (section « Emploi du temps » de chaque fiche, 1.6) par script : ne pas retoucher à la main sans vérifier.
// Chargé à la demande (import dynamique) : le fichier est volumineux. `rows` : [heure (24 h), lieu / activité].
export const SCHEDULES: Record<string, VillagerSchedule> = {
  'alex': {
    intro: 'Au Printemps et en Automne, s’il ne pleut pas, Alex sort de sa maison à 8h pour s’installer à côté de l’arbre à droite de sa maison et l’après-midi, il reste à gauche de l’enclos du chien. En Été, il va à la plage le matin puis tient le stand de crème glacée à gauche du Musée l’après midi. Le 16ème jour de l’été, il a rendez-vous à la Clinique d’Harvey. En Hiver, il travaille presque tous les jours au Spa. Une fois la Station balnéaire sur l’Île Gingembre est débloquée, Alex peut y passer la journée de manière aléatoire. Après avoir quitté l’île à 18 heures, Alex rentrera immédiatement chez lui pour se coucher. Alex ne se rend jamais à la Station les jours de Festivals ou le jour de son examen à la Clinique d’Harvey. Les horaires d’Alex sont indiqués ci-dessous, classés par ordre de priorité. Par exemple, s’il pleut, cet horaire remplace tous les autres en dessous.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi 15 (Printemps)', rows: [['7:50', 'Il quitte sa maison pour se tenir sous l’arbre dehors.'], ['10:20', 'Monte à bord du bus pour le Désert de Calico pour assister au Festival du désert.'], ['10:30', 'Se tient près du stand du chef.'], ['0:50', 'Embarque dans le bus de retour vers la vallée.']] },
        { title: 'Festival du désert (en temps que vendeur)', rows: [['11:10', 'Monte à bord du bus pour le Désert de Calico.'], ['11:30', 'Arrive à son stand.'], ['0:00', 'Il quitte le stand et monte dans le bus pour retourner dans la vallée.']] },
        { title: 'Jour de pluie', rows: [['8:00', 'Quitte sa chambre et attend dans l’entrée.'], ['13:00', 'Va dans sa chambre soulever des haltères.'], ['16:00', 'Quitte sa chambre et va près de l’enclos du chien.'], ['16:20', 'Arrive près de l’enclos du chien.'], ['18:30', 'Retourne à la maison et reste dans l’entrée.'], ['20:00', 'Rentre dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
        { title: 'Mercredi Si le joueur a moins de 14 avec Haley ou Alex', rows: [['8:00', 'Quitte la maison et va sous un arbre proche.'], ['12:00', 'Va chez Haley et Emily .'], ['13:00', 'Dans la maison d’Haley et Emily .'], ['16:30', 'Quitte la maison d’Haley et Emily pour aller à l’enclos du chien.'], ['17:10', 'Reste près de l’enclos du chien.'], ['18:40', 'Rentre chez lui et reste dans l’entrée.'], ['20:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
        { title: 'Dimanche (L’événement des 14 d’Alex à été vu.)', rows: [['8:00', 'Il quitte sa maison pour se tenir sous l’arbre dehors.'], ['11:00', 'Il se rend dans l’arrière-salle du Saloon du fruit étoilé.'], ['15:00', 'Part pour se tenir près de la niche du chien.'], ['18:30', 'Il entre dans sa maison et se tient dans l’entrée.'], ['20:00', 'Il va se tenir debout dans sa chambre.'], ['22:00', 'Va se coucher.']] },
        { title: 'Calendrier régulier', rows: [['8:00', 'Il quitte sa maison pour se tenir sous l’arbre dehors.'], ['8:20', 'Arrive à coté de l’arbre.'], ['13:00', 'Quitte l’arbre pour rentrer chez lui.'], ['13:20', 'Arrive dans sa chambre et soulève des haltères.'], ['16:00', 'Quitte sa chambre pour aller vers l’enclos du chien.'], ['16:20', 'Arrive à côté de l’enclos du chien.'], ['18:30', 'Rentre chez lui et reste dans l’entrée.'], ['20:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Mardi 16', rows: [['8:00', 'Quitte la maison et va sous un arbre proche.'], ['10:30', 'Va à la clinique.'], ['11:00', 'Attend dans la salle d’attente.'], ['13:40', 'Est dans la salle d’examen.'], ['16:00', 'Rentre chez lui.'], ['16:50', 'Va dans sa chambre et se tient face à son armoire.']] },
        { title: 'Jour de pluie', rows: [['8:00', 'Quitte sa chambre et reste dans l’entrée.'], ['13:00', 'Va dans sa chambre soulever des haltères.'], ['16:00', 'Quitte sa chambre pour aller vers l’enclos du chien.'], ['18:30', 'Retourne chez lui et reste dans l’entrée.'], ['20:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
        { title: 'Mercredi Si le joueur a moins de 14 avec Haley ou Alex', rows: [['8:00', 'Quitte la maison et va sous un arbre proche.'], ['12:00', 'Va chez Haley et Emily .'], ['13:00', 'Dans la maison d’Haley et Emily .'], ['16:30', 'Quitte la maison d’Haley et Emily pour aller à l’enclos du chien.'], ['17:10', 'Reste près de l’enclos du chien.'], ['18:40', 'Rentre chez lui et reste dans l’entrée.'], ['20:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
        { title: 'Dimanche (L’événement des 14 d’Alex à été vu.)', rows: [['8:00', 'Il quitte sa maison pour se tenir sous l’arbre dehors.'], ['11:00', 'Il se rend dans l’arrière-salle du Saloon du fruit étoilé.'], ['15:00', 'Part pour se tenir près de la niche du chien.'], ['18:30', 'Il entre dans sa maison et se tient dans l’entrée.'], ['20:00', 'Il va se tenir debout dans sa chambre.'], ['22:00', 'Va se coucher.']] },
        { title: 'Calendrier régulier', rows: [['7:50', 'Quitte la maison pour la plage.'], ['8:30', 'Reste à la plage.'], ['12:00', 'Quitte la plage pour travailler au stand de glaces.'], ['13:00', 'Travaille au stand de glace à coté du Musée.'], ['17:00', 'Rentre chez lui.'], ['18:00', 'Va dans sa chambre soulever des haltères.'], ['19:00', 'Reste dans l’entrée'], ['20:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Jour de pluie', rows: [['8:00', 'Quitte sa chambre et reste dans l’entrée.'], ['13:00', 'Va dans sa chambre soulever des haltères.'], ['16:00', 'Quitte sa chambre pour aller vers l’enclos du chien.'], ['18:30', 'Rentre chez lui et reste dans l’entrée.'], ['20:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
        { title: 'Mercredi Si le joueur a moins de 14 avec Haley ou Alex', rows: [['8:00', 'Quitte la maison et va sous un arbre proche.'], ['12:00', 'Va chez Haley et Emily .'], ['13:00', 'Dans la maison d’Haley et Emily .'], ['16:30', 'Quitte la maison d’Haley et Emily pour aller à l’enclos du chien.'], ['17:10', 'Reste près de l’enclos du chien.'], ['18:40', 'Rentre chez lui et reste dans l’entrée.'], ['20:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
        { title: 'Dimanche (L’événement des 14 d’Alex à été vu.)', rows: [['8:00', 'Il quitte sa maison pour se tenir sous l’arbre dehors.'], ['11:00', 'Il se rend dans l’arrière-salle du Saloon du fruit étoilé.'], ['15:00', 'Part pour se tenir près de la niche du chien.'], ['18:30', 'Il entre dans sa maison et se tient dans l’entrée.'], ['20:00', 'Il va se tenir debout dans sa chambre.'], ['22:00', 'Va se coucher.']] },
        { title: 'Calendrier régulier', rows: [['8:00', 'Quitte la maison et va sous un arbre proche.'], ['13:00', 'Va dans sa chambre soulever des haltères.'], ['16:00', 'Quitte sa chambre pour aller vers l’enclos du chien.'], ['18:30', 'Rentre chez lui et reste dans l’entrée.'], ['20:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Mercredi, Jour 17 de l’Hiver', rows: [['9:00', 'Quitte la maison pour aller au Spa.'], ['15:00', '|Quitte la salle de sport du Spa et se dirige vers la plage pour participer au Marché nocturne.'], ['0:00', 'Quitte le Marché nocturne et rentre chez lui.']] },
        { title: 'Mercredi Si le joueur a moins de 14 avec Haley ou Alex', rows: [['8:00', 'Quitte la maison et va sous un arbre proche.'], ['12:00', 'Va chez Haley et Emily .'], ['13:00', 'Dans la maison d’Haley et Emily .'], ['16:30', 'Quitte la maison d’Haley et Emily pour aller à l’enclos du chien.'], ['17:10', 'Reste près de l’enclos du chien.'], ['18:40', 'Rentre chez lui et reste dans l’entrée.'], ['20:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:00', 'Va au lit.']] },
        { title: 'Dimanche (L’événement des 14 d’Alex à été vu.)', rows: [['8:00', 'Il quitte sa maison pour se tenir sous l’arbre dehors.'], ['11:00', 'Il se rend dans l’arrière-salle du Saloon du fruit étoilé.'], ['15:00', 'Part pour se tenir près de la niche du chien.'], ['18:30', 'Il entre dans sa maison et se tient dans l’entrée.'], ['20:00', 'Il va se tenir debout dans sa chambre.'], ['22:00', 'Va se coucher.']] },
        { title: 'Calendrier régulier', rows: [['8:00', 'Dans sa chambre'], ['9:00', 'Quitte la maison pour le Spa.'], ['11:30', 'Arrive au Spa et passe son temps dans le vestiaire des hommes à s’entraîner.'], ['15:00', 'Quitte le spa et rentre chez lui.'], ['17:30', 'Reste dans sa chambre'], ['18:00', 'Quitte la maison pour l’enclos à chien.'], ['19:30', 'Rentre chez lui et reste dans l’entrée.'], ['21:00', 'Va dans sa chambre et se tient face à son armoire.'], ['22:30', 'Va au lit.']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi 15 (Printemps)', rows: [['7:50', 'Il quitte sa maison pour se tenir sous l’arbre dehors.'], ['10:20', 'Monte à bord du bus pour le Désert de Calico pour assister au Festival du désert.'], ['10:30', 'Se tient près du stand du chef.'], ['0:50', 'Embarque dans le bus de retour vers la vallée.']] },
        { title: 'Lundi', rows: [['8:00', 'Quitte la ferme pour la ville.'], ['10:00', 'Arrive chez ses grand-parents et reste dans l’entrée.'], ['18:00', 'Revient à la ferme'], ['22:00', 'Va au lit.']] },
        { title: 'Dimanche (L’événement des 14 d’Alex à été vu.)', rows: [['8:00', 'Il quitte sa maison pour se tenir sous l’arbre dehors.'], ['11:00', 'Il se rend dans l’arrière-salle du Saloon du fruit étoilé.'], ['15:00', 'Part pour se tenir près de la niche du chien.'], ['18:30', 'Il entre dans sa maison et se tient dans l’entrée.'], ['20:00', 'Il va se tenir debout dans sa chambre.'], ['22:00', 'Va se coucher.']] },
      ] },
    ],
  },
  'elliott': {
    intro: 'Vous trouverez ci-dessous les horaires d’Elliott classés par ordre de priorité. Par exemple, s’il pleut, ce programme prévaut sur tous les autres. Le 9 de l’été, il a rendez-vous à la clinique.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Jeudi', rows: [['8:00', 'Chez lui'], ['11:30', 'Se rend au Magasin général de Pierre'], ['17:30', 'Quitte le magasin et rentre chez lui']] },
        { title: 'Horaires réguliers', rows: [['8:00', 'Chez lui'], ['12:00', 'Quitte sa cabane et se tient sur la plage au Sud de chez lui'], ['13:30', 'Rentre chez lui'], ['15:00', 'Quitte sa cabane et se tient sur le pont menant à la ville'], ['18:00', 'Quitte le pont et rentre chez lui pour la nuit']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Mardi 9', rows: [['10:30', 'Quitte sa cabine et va à la Clinique d’Harvey'], ['16:00', 'Quitte la clinique et rentre chez lui pour la nuit']] },
        { title: 'Jeudi', rows: [['8:00', 'Chez lui'], ['11:30', 'Se rend au Magasin général de Pierre'], ['17:30', 'Quitte le magasin et rentre chez lui pour la nuit']] },
        { title: 'Vendredi, Dimanche', rows: [['8:00', 'Chez lui'], ['12:00', 'Quitte sa cabane et se tient sur la plage au Sud de chez lui'], ['13:30', 'Rentre chez lui'], ['15:00', 'Quitte sa cabane et se tient sur le pont menant à la ville'], ['18:00', 'Quitte le pont et rentre chez lui pour la nuit']] },
        { title: 'Horaires réguliers', rows: [['8:00', 'Chez lui'], ['11:30', 'Quitte sa cabane, se rend dans la Forêt au Sud de la Maison de Leah'], ['18:00', 'Quitte la forêt et rentre chez lui pour la nuit']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Jeudi', rows: [['8:00', 'Chez lui'], ['11:30', 'Se rend au Magasin général de Pierre'], ['17:30', 'Quitte le magasin et rentre chez lui pour la nuit']] },
        { title: 'Vendredi, Dimanche', rows: [['8:00', 'Chez lui'], ['12:00', 'Quitte sa cabane et se tient sur la plage au Sud de chez lui'], ['13:30', 'Rentre chez lui'], ['15:00', 'Quitte sa cabane et se tient sur le pont menant à la ville'], ['18:00', 'Quitte le pont et rentre chez lui pour la nuit']] },
        { title: 'Horaires réguliers', rows: [['8:00', 'Chez lui'], ['11:30', 'Quitte sa cabane et se rend à la Librairie'], ['17:30', 'Quitte la librairie et rentre chez lui pour la nuit']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Mercredi 17', rows: [['8:00', 'Chez lui'], ['11:30', 'Quitte sa cabane et se rend au Musée'], ['16:50', 'Quitte le musée et se rend au Marché nocturne'], ['1:00', 'Rentre chez lui']] },
        { title: 'Jeudi', rows: [['8:00', 'Chez lui'], ['11:30', 'Se rend au Magasin général de Pierre'], ['17:30', 'Quitte le magasin et rentre chez lui pour la nuit']] },
        { title: 'Vendredi, dimanche', rows: [['8:00', 'Chez lui'], ['12:00', 'Quitte sa cabane et se tient sur la plage au Sud de chez lui'], ['13:30', 'Rentre chez lui'], ['15:00', 'Quitte sa cabane et se tient sur le pont menant à la ville'], ['18:00', 'Quitte le pont et rentre chez lui pour la nuit']] },
        { title: 'Horaires réguliers', rows: [['8:00', 'Chez lui'], ['11:30', 'Quitte sa cabane et se rend à la Librairie'], ['17:30', 'Quitte la librairie et rentre chez lui pour la nuit']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['8:30', 'Quitte la maison de ferme et se rend à la plage'], ['17:00', 'Quitte la plage et rentre à la maison']] },
      ] },
    ],
  },
  'abigail': {
    intro: 'Les jours ensoleillés pendant le Printemps, l’Été ou l’Automne, elle sera souvent sur le pont de la rivière à l’Est du Magasin général de Pierre. Le 4ème jour du Printemps, elle a rendez-vous à la clinique. N.B.: Pendant les jours pluvieux, elle peut ne pas être aux places mentionnées ci-dessous.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Sort de sa chambre pour aller dans la cuisine.'], ['10:30', 'Sort de la cuisine pour aller dans le Magasin général de Pierre.'], ['13:00', 'Sort de la maison pour se tenir sur le pont près du Marché Joja.'], ['13:30', 'Sur le pont près du Marché Joja.'], ['16:30', 'Se rend à la maison.'], ['17:20', 'Dans sa chambre, elle joue à des jeux-vidéo.'], ['19:30', 'Elle se rend dans son lit.']] },
        { title: 'Mardi', rows: [['9:00', 'Sort de sa chambre pour aller dans la cuisine.'], ['10:30', 'Sort de la cuisine pour aller dans le Magasin général de Pierre.'], ['13:00', 'Quitte sa chambre pour aller sur le pont près de Marché Joja.'], ['13:30', 'Reste sur le pont près de Marché Joja.'], ['16:30', 'Retourne dans sa chambre.'], ['17:20', 'Dans sa chambre, joue aux jeux vidéos.'], ['19:30', 'Va dormir.']] },
        { title: 'Mercredi', rows: [['10:00', 'Quitte sa chambre pour aller au Musée.'], ['12:00', 'Dans le Musée, lis un livre dans vers la bibliothèque.'], ['18:00', 'Se dirige vers le Cimetière.'], ['19:00', 'Est devant la tombe de Mona.'], ['22:00', 'Retourne dans sa chambre.'], ['22:40', 'Arrive dans sa chambre.']] },
        { title: 'Jeudi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['10:30', 'Quitte la cuisine pour aller dans Le magasin.'], ['13:00', 'Quitte sa maison pour aller sur le pont près de Marché Joja.'], ['13:30', 'Est sur le pont près de Marché Joja.'], ['16:30', 'Retourne dans sa chambre.'], ['17:20', 'Dans sa chambre, joue aux jeux vidéos.'], ['19:30', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['11:00', 'Quitte la cuisine pour aller dans le magasin.'], ['15:00', 'Quitte le magasin pour aller dans le Saloon.'], ['15:50', 'Dans le Saloon du fruit étoilé, assise sur le sofa près des bornes d’arcade.'], ['21:00', 'Retourne dans sa chambre.'], ['21:40', 'Arrive dans sa chambre.']] },
        { title: 'Samedi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['10:30', 'Quitte la cuisine pour aller dans le magasin.'], ['13:00', 'Quitte le magasin pour aller sur le pont près de Marché Joja.'], ['13:30', 'Est sur le pont près de Marché Joja.'], ['16:30', 'Retourne dans sa chambre.'], ['17:20', 'Dans sa chambre, joue au jeux vidéos.'], ['19:30', 'Va au lit.']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa chambre.'], ['10:30', 'Quitte sa chambre pour aller dans la chambre de Caroline et Pierre.'], ['13:00', 'Quitte le magasin pour aller près de la tour du sorcier.'], ['16:00', 'Près de la tour du sorcier dans la forêt.'], ['20:00', 'Retourne dans sa chambre.'], ['22:30', 'Arrive dans sa chambre.']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Quitte sa chambre pour aller dans la la cuisine.'], ['11:00', 'Quitte le magasin, se rend à la Voie ferrée.'], ['13:00', 'Attend en face du quai du train.'], ['14:00', 'Se rend au lac à l’est de la Scierie.'], ['15:00', 'Est dans la Montagne à l’est de la Scierie près du lac.'], ['17:30', 'Se dirige vers le le magasin.'], ['19:30', 'Va au lit.']] },
        { title: 'Mardi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['11:00', 'Quitte le magasin, se rend à la Voie ferrée.'], ['13:00', 'Attend en face du quai du train.'], ['14:00', 'Se rend au lac à l’est de la Scierie.'], ['15:00', 'Est à l’est de la Scierie près du lac.'], ['17:30', 'Se dirige le magasin.'], ['19:30', 'Va au lit.']] },
        { title: 'Mercredi', rows: [['10:00', 'Quitte le magasin pour aller dans le Musée'], ['12:00', 'À l’intérieur du Musée, observant les livres.'], ['18:00', 'Se rend au cimetière.'], ['19:00', 'Se tient en face de la tombe de Mona.'], ['22:00', 'Se dirige vers le magasin.'], ['22:40', 'Arrive dans le magasin.']] },
        { title: 'Jeudi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['11:00', 'Quitte le magasin, se rend à la Voie ferrée.'], ['13:20', 'Attend en face du quai du train.'], ['14:00', 'Se rend au lac à l’est de la Scierie.'], ['15:00', 'Est à l’est de la Scierie près du lac.'], ['17:30', 'Se dirige vers le magasin.'], ['19:30', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['11:00', 'Quitte la cuisine pour le Magasin général de Pierre.'], ['15:00', 'Quitte le magasin pour aller au Saloon du fruit étoilé.'], ['15:50', 'Dans le Saloon du fruit étoilé, assise dans le sofa près des bornes d’arcade.'], ['21:00', 'Se dirige vers le magasin.'], ['21:40', 'Arrive dans le magasin.']] },
        { title: 'Samedi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['11:00', 'Quitte le magasin, se rend à la Voie ferrée.'], ['13:00', 'Attend en face du quai du train.'], ['14:00', 'Se rend au lac à l’est de la Scierie.'], ['15:00', 'Est à l’est de la Scierie près du lac.'], ['17:30', 'Se dirige vers le magasin.'], ['19:30', 'Va au lit.']] },
        { title: 'Dimanche', rows: [['12:30', 'Quitte sa chambre pour aller dans la chambre de Caroline et Pierre.'], ['13:00', 'Quitte le magasin, se rend à la Tour du sorcier.'], ['16:00', 'Se tient devant la Tour du sorcier dans la Forêt Sève-Cendreuse.'], ['20:00', 'Se dirige vers le magasin.'], ['22:30', 'Arrive dans le le magasin.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Dans sa chambre.'], ['11:00', 'Quitte le magasin pour aller à La plage.'], ['13:00', 'Se tient au bout du long ponton à gauche de la Poissonnerie.'], ['18:00', 'Quitte La plage.'], ['19:30', 'Arrive dans le magasin et va au lit.']] },
        { title: 'Mardi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['10:30', 'Quitte la cuisine pour le Magasin général de Pierre.'], ['13:00', 'Quitte le magasin pour se tenir près de l’ Arrêt de bus.'], ['14:20', 'Se tient près de l’arrêt de bus.'], ['17:00', 'Se dirige vers le magasin.'], ['18:30', 'Dans sa chambre, jouant aux jeux vidéos.'], ['19:30', 'Va au lit.']] },
        { title: 'Mercredi', rows: [['10:30', 'Quitte le magasin pour aller dans le Musée.'], ['12:00', 'À l’intérieur du Musée, observant les livres.'], ['18:00', 'Se rend au cimetière.'], ['19:00', 'Se tient en face de la tombe de Mona.'], ['22:00', 'Se dirige vers le magasin.'], ['22:40', 'Arrive dans le magasin.']] },
        { title: 'Jeudi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['10:30', 'Quitte la cuisine pour le Magasin général de Pierre.'], ['13:00', 'Quitte le magasin pour se tenir près de l’arrêt de bus.'], ['14:20', 'Se tient près de l’arrêt de bus.'], ['17:00', 'Se dirige vers le magasin.'], ['18:30', 'Dans sa chambre, jouant aux jeux vidéos.'], ['19:30', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['11:00', 'Quitte la cuisine pour le Magasin général de Pierre.'], ['15:00', 'Quitte le magasin pour aller au Saloon du fruit étoilé.'], ['15:50', 'Dans le Saloon du fruit étoilé, assise sur le sofa près des bornes d’arcade.'], ['21:00', 'Se dirige le magasin.'], ['21:40', 'Arrive dans le magasin.']] },
        { title: 'Samedi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['11:00', 'Quitte la cuisine pour le Magasin général de Pierre.'], ['13:00', 'Quitte le magasin pour se tenir près de l’arrêt de bus.'], ['14:20', 'Se tient près de l’arrêt de bus.'], ['17:00', 'Se dirige vers le magasin.'], ['18:30', 'Dans sa chambre, jouant aux jeux vidéos.'], ['19:30', 'Va au lit.']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa chambre.'], ['10:30', 'Quitte sa chambre pour aller dans la chambre de Caroline et Pierre.'], ['13:00', 'Quitte le magasin pour aller près de la Tour du sorcier.'], ['16:00', 'Près de la Tour du sorcier dans la Forêt Sève-Cendreuse.'], ['20:00', 'Se dirige vers le magasin.'], ['22:30', 'Arrive dans le magasin.']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['10:30', 'Se rend à la Scierie. Reste à côté du comptoir.'], ['14:30', 'Retourne dans le magasin et joue aux jeux vidéos.'], ['19:30', 'Va au lit.']] },
        { title: 'Mardi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['10:30', 'Se rend à la Scierie. Reste à côté du comptoir.'], ['14:30', 'Retourne dans le magasin et joue aux jeux vidéos.'], ['19:30', 'Va au lit.']] },
        { title: 'Mercredi', rows: [['10:00', 'Quitte le magasin pour aller dans le Musée.'], ['12:00', 'À l’intérieur de la Musée, observant les livres.'], ['18:00', 'Se rend au cimetière.'], ['19:00', 'Se tient en face de la tombe de Mona.'], ['22:00', 'Se dirige vers le magasin.'], ['22:40', 'Arrive dans le magasin.']] },
        { title: 'Jeudi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['10:30', 'Quitte la cuisine pour aller à la Scierie.'], ['12:50', 'Reste à côté du comptoir près de Robine.'], ['19:00', 'Assise dans sa chambre jouant aux jeux vidéos']] },
        { title: 'Vendredi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['11:00', 'Quitte la cuisine pour le Magasin général de Pierre.'], ['15:00', 'Quitte Magasin général de Pierre pour aller au Saloon du fruit étoilé.'], ['15:50', 'Dans Saloon du fruit étoilé, assise sur le sofa près des bornes d’arcade.'], ['21:00', 'Se dirige vers le magasin.'], ['21:40', 'Arrive dans le magasin.']] },
        { title: 'Samedi', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['10:30', 'Se rend à la Scierie. Reste à côté du comptoir.'], ['14:30', 'Retourne dans le magasin et joue aux jeux vidéos.'], ['19:30', 'Va au lit.']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa chambre.'], ['10:30', 'Quitte sa chambre pour aller dans la chambre de Caroline et Pierre.'], ['13:00', 'Quitte le magasin pour aller près de la Tour du sorcier.'], ['16:00', 'Près de la Tour du sorcier dans la Forêt Sève-Cendreuse.'], ['20:00', 'Se dirige vers le magasin.'], ['22:30', 'Arrive dans le magasin.']] },
      ] },
      { label: 'Exceptions', blocks: [
        { title: 'Jour de pluie (Option 1)', rows: [['9:00', 'Dans sa chambre.'], ['11:00', 'Quitte sa chambre pour le Magasin général de Pierre.'], ['13:00', 'Va dans la cuisine.'], ['15:00', 'Retourne dans sa chambre.'], ['22:00', 'Va au lit.']] },
        { title: 'Jour de pluie (Option 2)', rows: [['9:00', 'Quitte sa chambre pour aller dans la cuisine.'], ['11:00', 'Quitte la cuisine pour le Magasin général de Pierre.'], ['14:00', 'Quitte le magasin pour aller au Saloon du fruit étoilé.'], ['14:50', 'Dans le Saloon du fruit étoilé, assise sur le sofa près des bornes d’arcade.'], ['20:00', 'Se dirige vers le magasin.'], ['21:20', 'Va au lit.']] },
        { title: 'Le 6 ou 16 de n’importe quelle Saison', rows: [['9:00', 'Quitte sa chambre pour aller dans la la cuisine.'], ['10:30', 'Quitte la cuisine pour le Magasin général de Pierre.'], ['15:00', 'Va dans la Montagne, se tenant sur le côté ouest du lac, jouant de la flûte.'], ['20:00', 'Se dirige vers le magasin pour aller au lit.']] },
        { title: 'Jeudi 4 au Printemps', rows: [['9:00', 'Dans sa chambre.'], ['12:30', 'Dans la salle d’attente de la Clinique d’Harvey'], ['13:30', 'Dans la salle de consultation de la Clinique d’Harvey.'], ['16:00', 'Dans sa chambre.'], ['20:00', 'Dans son lit.']] },
        { title: 'Le 11 & 25 de n’importe quelle saison (Quand vous avez moins de 6 cœurs avec Sebastian)', rows: [['9:00', 'Dans son lit.'], ['10:00', 'Quitte le magasin pour aller dans la chambre de Sebastian.'], ['12:10', 'Dans la chambre de Sebastian.'], ['17:00', '|Se dirige vers le magasin pour aller dans son lit.']] },
        { title: 'Le 11 & 25 de n’importe quelle saison (Quand vous avez 6 cœurs ou plus avec Sebastian)', rows: [['9:00', 'Quitte sa chambre pour aller dans la la cuisine.'], ['10:30', 'Quitte la cuisine pour le Magasin général de Pierre.'], ['13:00', 'Quitte le magasin pour aller se tenir sur le pont près du Marché Joja.'], ['13:30', 'Se tient sur le pont près du Marché Joja.'], ['16:30', 'Se dirige vers le magasin.'], ['17:20', 'Dans sa chambre, jouant aux jeux vidéos.'], ['19:30', 'Va au lit.']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['6:00', 'À la maison, dans la cuisine.'], ['8:30', 'Quitte la maison pour aller au Magasin général de Pierre.'], ['9:30', 'Arrive au Magasin général de Pierre, se tient au comptoir à côté de Pierre.'], ['13:00', 'Quitte Magasin général de Pierre, se rend au cimetière.'], ['13:40', 'Se tient en face de la tombe de Mona.'], ['17:00', 'Quitte le cimetière, se dirige au Saloon du fruit étoilé.'], ['17:30', 'Arrive au Saloon du fruit étoilé, se dirige vers les bornes d’arcades.'], ['17:40', 'Commence à jouer à Aventures du Roi de la Prairie.'], ['20:30', 'Arrête de jouer à Aventures du Roi de la Prairie, se dirige vers la maison.'], ['22:00', 'Dans la maison au lit.']] },
        { title: 'Vendredi', rows: [['6:00', 'Dans la maison.'], ['8:30', 'Se dirige au Magasin général de Pierre et se tient dans la cuisine.'], ['11:00', 'Se rend dans la Montagne.'], ['11:40', 'Se trouve à l’ouest du lac de la Montagne.'], ['15:00', 'Se rend au Saloon du fruit étoilé.'], ['17:30', 'Dans le Saloon du fruit étoilé, assise sur le sofa près des bornes d’arcade.'], ['20:30', 'Se dirige à la maison.'], ['22:00', 'Dans la maison au lit.']] },
      ] },
    ],
  },
  'emily': {
    intro: 'Les horaires d’Emily sont énumérés ci-dessous par ordre de priorité. Par exemple, s’il pleut, cet horaire remplace tous les autres.',
    groups: [
      { label: '', blocks: [
        { title: 'Hiver 11', rows: [['9:00', 'Dans sa chambre'], ['10:30', 'Quitte sa maison pour aller à la Clinique d’Harvey, attend dans la salle d’attente'], ['13:30', 'Va à la salle d’examen'], ['16:00', 'Quitte la clinique et va au Saloon du fruit étoilé'], ['0:30', 'Retourne chez elle pour la nuit']] },
        { title: 'Hiver 15', rows: [['9:00', 'Dans sa chambre'], ['12:00', 'Quitte sa chambre et reste dans le salon'], ['14:30', 'Quitte sa maison pour aller au Marché nocturne'], ['0:30', 'Retourne chez elle pour la nuit']] },
        { title: 'Jour de pluie', rows: [['9:00', 'Dans sa chambre'], ['12:00', 'Quitte sa chambre pour aller dans le salon'], ['14:30', 'Quitte sa maison pour travailler au Saloon du fruit étoilé'], ['0:30', 'Retourne chez elle pour la nuit']] },
        { title: 'Mardi', rows: [['9:00', 'Dans sa chambre'], ['10:00', 'Quitte sa maison pour attendre la classe d’aérobic au Magasin général de Pierre'], ['13:00', 'Commencement du cours d’aérobic'], ['16:00', 'Quitte le magasin de pierre pour travailler au Saloon du fruit étoilé'], ['0:30', 'Retourne chez elle pour la nuit']] },
        { title: 'Vendredi, Centre communautaire restauré', rows: [['9:00', 'Dans sa chambre'], ['10:00', 'Marche jusqu’au Centre communautaire, reste dans la salle de fabrication'], ['15:30', 'Quitte le centre communautaire pour travailler au Saloon du fruit étoilé'], ['0:30', 'Retourne chez elle pour la nuit']] },
        { title: 'Horaires réguliers', rows: [['9:00', 'Dans sa chambre'], ['12:00', 'Quitte la chambre et se rend dans le salon'], ['15:30', 'Se rend à son travail au Saloon du fruit étoilé'], ['0:30', 'Retourne chez elle pour la nuit']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['8:30', 'Se rend au 2 allée des Saules, dans la cuisine'], ['11:00', 'Quitte le 2 allée des Saules pour aller à Pélican Ville, à l’Est du Centre communautaire, et regarde la rivière'], ['15:00', 'Se rend au Saloon du fruit étoilé pour travailler'], ['22:00', 'Quitte le Saloon et rentre à la maison']] },
        { title: 'Vendredi', rows: [['8:30', 'Quitte la maison pour se rendre sur le ponton à l’Ouest de la Poissonnerie'], ['13:00', 'Quitte la plage pour aller au Magasin général de Pierre'], ['15:00', 'Quitte le magasin pour aller travailler au Saloon du fruit étoilé'], ['22:00', 'Quitte le Saloon et rentre à la maison']] },
      ] },
    ],
  },
  'haley': {
    intro: 'Son comportement change quand il pleut ou neige dehors. Elle n’ira pas à la fontaine Mardi-Dimanche si il pleut. Sa maison est ouverte de 9h du matin à 8h du soir. Si elle est à l’intérieur pendant que c’est fermé et que vous n’y êtes pas, la maison sera inaccessible pour vous.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Dans sa chambre'], ['10:00', 'Quitte sa chambre pour aller dans la cuisine'], ['11:00', 'Quitte sa maison pour aller à la rivière au sud du ranch de Marnie'], ['12:20', 'A la rivière au sud du ranch de Marnie, en train de prendre des photos'], ['16:30', 'Rentre chez elle'], ['17:50', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['23:00', 'Va au lit']] },
        { title: 'Mardi', rows: [['9:00', 'Dans sa chambre'], ['11:00', 'Quitte sa maison pour se rendre à la fontaine'], ['12:20', 'À la fontaine, à gauche du Centre Communautaire'], ['16:30', 'Rentre chez elle'], ['17:50', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['22:30', 'Va au lit']] },
        { title: 'Mercredi', rows: [['9:00', 'Dans sa chambre'], ['12:10', 'Dans le salon'], ['12:30', 'Quitte sa maison pour se rendre à la fontaine'], ['16:30', 'Quitte la fontaine pour rentrer chez elle'], ['17:30', 'Rentre chez elle'], ['17:50', 'Reste dans la cuisine'], ['20:20', 'Dans sa chambre'], ['22:30', 'Va au lit']] },
        { title: 'Jeudi', rows: [['9:00', 'Dans sa chambre'], ['11:00', 'Quitte sa maison pour se rendre à la fontaine'], ['12:20', 'À la fontaine, à gauche du Centre Communautaire'], ['16:30', 'Rentre chez elle'], ['17:50', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['22:30', 'Va au lit']] },
        { title: 'Vendredi', rows: [['9:00', 'Dans sa chambre'], ['11:00', 'Quitte sa maison pour se rendre à la fontaine'], ['12:20', 'À la fontaine, à gauche du Centre Communautaire'], ['16:30', 'Rentre chez elle'], ['17:50', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['22:30', 'Va au lit']] },
        { title: 'Samedi', rows: [['9:00', 'Dans sa chambre'], ['11:00', 'Quitte sa maison pour se rendre à la fontaine'], ['12:20', 'À la fontaine, à gauche du Centre Communautaire'], ['16:30', 'Rentre chez elle'], ['17:50', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['22:30', 'Va au lit']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa chambre'], ['11:00', 'Quitte sa maison pour se rendre à la fontaine'], ['12:20', 'À la fontaine, à gauche du Centre Communautaire'], ['16:30', 'Rentre chez elle'], ['17:50', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['22:30', 'Va au lit']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Dans sa chambre'], ['10:30', 'Quitte la maison pour se rendre à la plage'], ['11:50', 'À la plage, en haut à gauche'], ['13:30', 'Va au stand de glace d’Alex'], ['14:30', 'Au stand de glace d’Alex, à côté du musée / de la bibliothèque'], ['17:00', 'Rentre chez elle'], ['18:20', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['23:00', 'Va au lit']] },
        { title: 'Mardi', rows: [['9:00', 'Dans sa chambre'], ['10:30', 'Quitte la maison pour se rendre à la plage'], ['11:50', 'À la plage, en haut à gauche'], ['13:30', 'Va au stand de glace d’Alex'], ['14:30', 'Au stand de glace d’Alex, à côté du musée / de la bibliothèque'], ['17:00', 'Rentre chez elle'], ['18:20', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['23:00', 'Va au lit']] },
        { title: 'Mercredi', rows: [['9:00', 'Dans sa chambre'], ['12:10', 'Dans son salon'], ['15:00', 'Quitte la maison pour se rendre à la fontaine, à gauche du Centre Communautaire'], ['16:40', 'Quitte la fontaine et marche jusqu’à l’arbre au nord de la maison de Jodi/Kent/Sam/Vincent.'], ['20:20', 'Dans sa chambre'], ['22:30', 'Va au lit']] },
        { title: 'Jeudi', rows: [['9:00', 'Dans sa chambre'], ['10:30', 'Quitte la maison pour se rendre à la plage'], ['11:50', 'À la plage, en haut à gauche'], ['13:30', 'Va au stand de glace d’Alex'], ['14:30', 'Au stand de glace d’Alex, à côté du musée / de la bibliothèque'], ['17:00', 'Rentre chez elle'], ['18:20', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['23:00', 'Va au lit']] },
        { title: 'Vendredi', rows: [['9:00', 'Dans sa chambre'], ['10:30', 'Quitte la maison pour se rendre à la plage'], ['11:50', 'À la plage, en haut à gauche'], ['13:30', 'Va au stand de glace d’Alex'], ['14:30', 'Au stand de glace d’Alex, à côté du musée / de la bibliothèque'], ['17:00', 'Rentre chez elle'], ['18:20', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['23:00', 'Va au lit']] },
        { title: 'Samedi', rows: [['9:00', 'Dans sa chambre'], ['10:30', 'Quitte la maison pour se rendre à la plage'], ['11:50', 'À la plage, en haut à gauche'], ['13:30', 'Va au stand de glace d’Alex'], ['14:30', 'Au stand de glace d’Alex, à côté du musée / de la bibliothèque'], ['17:00', 'Rentre chez elle'], ['18:20', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['23:00', 'Va au lit']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa chambre'], ['10:30', 'Quitte la maison pour se rendre à la plage'], ['11:50', 'À la plage, en haut à gauche'], ['13:30', 'Va au stand de glace d’Alex'], ['14:30', 'Au stand de glace d’Alex, à côté du musée / de la bibliothèque'], ['17:00', 'Rentre chez elle'], ['18:20', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['23:00', 'Va au lit']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Horaire', rows: [['9:00', 'Dans sa chambre'], ['10:20', 'Dans la cuisine'], ['11:00', 'Quitte la maison pour se rendre à la rivière au sud du ranch de Marnie'], ['12:20', 'À la rivière au sud du ranch de Marnie, en train de prendre des photos'], ['16:30', 'Rentre chez elle'], ['17:50', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['23:00', 'Va au lit']] },
        { title: 'Mardi', rows: [['9:00', 'Dans sa chambre'], ['12:10', 'Dans le salon'], ['16:40', 'Dans la cuisine'], ['20:20', 'Dans sa chambre'], ['22:30', 'Va au lit']] },
        { title: 'Mercredi, Jeudi, Vendredi, Samedi, Dimanche', rows: [['11:00', 'Quitte la maison pour se rendre à la fontaine, à gauche du centre communautaire'], ['12:20', 'À la fontaine, à gauche du Centre Communautaire'], ['16:30', 'Rentre chez elle'], ['17:50', 'Chez elle, en train de préparer le diner'], ['20:20', 'Dans sa chambre'], ['22:30', 'Va au lit']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Lundi', rows: [['10:30', 'Sort du lit'], ['12:00', 'Va dans la cuisine'], ['13:00', 'Dans la cuisine'], ['19:00', 'Quitte la pièce']] },
        { title: 'Mardi', rows: [['11:00', 'Dans sa chambre'], ['12:00', 'Va dans la cuisine'], ['17:10', 'Dans la cuisine'], ['20:00', 'Dans le salon']] },
        { title: 'Mercredi', rows: [['10:00', 'Dans sa chambre'], ['11:00', 'Quitte sa maison pour se rendre à la fontaine, à gauche du Centre Communautaire'], ['12:20', 'À la fontaine, à gauche du Centre Communautaire'], ['16:30', 'Rentre chez elle'], ['17:50', 'Chez elle, en train de préparer le diner'], ['20:00', 'Retourne dans sa chambre']] },
        { title: 'Jeudi', rows: [['10:30', 'Sort du lit'], ['12:00', 'Quitte sa chambre, va dans la cuisine'], ['16:00', 'Quitte la cuisine, va dans sa chambre']] },
        { title: 'Vendredi', rows: [['10:30', 'Sort du lit'], ['12:00', 'Quitte sa chambre, va dans la cuisine'], ['16:00', 'Quitte la cuisine, va dans sa chambre'], ['19:00', 'Quitte la pièce']] },
        { title: 'Samedi', rows: [['9:00', 'Dans sa chambre'], ['12:00', 'Quitte sa chambre, va dans la cuisine'], ['16:00', 'Quitte la cuisine, va dans sa chambre'], ['19:00', 'Quitte sa chambre, va dans le salon'], ['22:00', 'Va au lit']] },
        { title: 'Dimanche', rows: [['12:00', 'Quitte sa chambre, va dans la cuisine'], ['14:00', 'Dans la cuisine'], ['17:00', 'Dans sa chambre'], ['19:00', 'Quitte sa chambre, va dans le salon']] },
      ] },
      { label: 'Exceptions', blocks: [
        { title: 'Pluie', rows: [['10:30', 'Se lève et reste à côté du dressing dans sa chambre'], ['11:30', 'Se déplace vers la coiffeuse de sa chambre'], ['12:00', 'Quitte sa chambre pour aller dans la cuisine'], ['16:00', 'Retourne dans sa chambre'], ['19:00', 'Quitte sa chambre et reste dans le salon'], ['22:00', 'Va au lit']] },
        { title: 'Hiver 9', rows: [['11:30', 'Clinique d’Harvey'], ['16:00', 'Rentre chez elle']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['6:00', 'À la maison'], ['9:30', 'Quitte la maison'], ['10:40', 'Arrive à Allée des Saules'], ['15:40', 'Quitte Allée des Saules'], ['17:00', 'Rentre à la maison'], ['22:00', 'Va au lit']] },
      ] },
    ],
  },
  'caroline': {
    intro: 'Ci-dessous sont détaillés les horaires de Caroline, priorisés de haut en bas. Par exemple, s’il pleut, les horaires de pluie prennent la priorité sur ceux d’en dessous. Le 25 d’Automne, elle a rendez-vous à la Clinique d’Harvey.',
    groups: [
      { label: '', blocks: [
        { title: '25 d’Automne', rows: [['8:00', 'Cuisine du Magasin général de Pierre'], ['10:00', 'Quitte la cuisine, se rend dans sa chambre'], ['12:00', 'Quitte sa chambre, se rend à la Clinique d’Harvey, reste dans la salle d’attente'], ['13:30', 'Rejoint la salle d’examen de la clinique'], ['16:00', 'Rentre chez elle, reste dans la pièce à vivre'], ['21:00', 'Se couche']] },
        { title: 'Pluvieux', rows: [['8:00', 'Cuisine du Magasin général de Pierre'], ['12:00', 'Quitte la cuisine, se rend dans les rayons du magasin'], ['13:30', 'Quitte le magasin, va dans sa chambre pour lire'], ['16:00', 'Quitte sa chambre, va dans la pièce à vivre'], ['21:00', 'Se couche']] },
        { title: '16 d’Hiver', rows: [['8:00', 'Cuisine du Magasin général de Pierre'], ['12:00', 'Quitte la cuisine, se rend dans les rayons du magasin'], ['13:30', 'Quitte le magasin et se rend dans Pélican Ville'], ['16:00', 'Quitte la ville pour aller au Marché nocturne'], ['13:30', 'Quitte le Marché Nocturne et rentre chez elle']] },
        { title: 'Mardi', rows: [['8:00', 'Pièce à vivre'], ['13:00', 'Le cours d’aérobic commence dans la pièce à vivre'], ['16:00', 'Le cours d’aérobic prend fin, reste dans la pièce à vivre pour discuter'], ['18:10', 'Se rend dans la cuisine'], ['21:00', 'Se couche']] },
        { title: 'Mercredi', rows: [['8:00', 'Cuisine du Magasin général de Pierre'], ['12:00', 'Quitte chez elle et va à la fontaine à gauche du Centre communautaire'], ['17:00', 'Rentre chez elle, dans la pièce à vivre'], ['21:00', 'Se couche']] },
        { title: 'Vendredi', rows: [['8:00', 'Cuisine du Magasin général de Pierre'], ['12:00', 'Quitte chez elle pour aller lire au Musée'], ['17:00', 'Rentre chez elle, dans la pièce à vivre'], ['21:00', 'Se couche']] },
        { title: 'Samedi, Centre Communautaire rénové', rows: [['8:00', 'Cuisine du Magasin général de Pierre'], ['11:00', 'Quitte sa maison, se rend au Centre communautaire, reste dans la pièce principale'], ['17:00', 'Rentre chez elle, dans la pièce à vivre'], ['21:00', 'Se couche']] },
        { title: 'Dimanche', rows: [['9:00', 'Reste dans sa chambre'], ['13:30', 'Quitte la cuisine, se rend dans les rayons du magasin'], ['14:40', 'Quitte le magasin et se rend sous l’arbre au Sud du Centre communautaire'], ['18:30', 'Rentre chez elle, dans sa chambre'], ['21:00', 'Se couche']] },
        { title: 'Horaires standards', rows: [['8:00', 'Cuisine du Magasin général de Pierre'], ['12:00', 'Quitte la cuisine, se rend dans les rayons du magasin'], ['13:30', 'Quitte le magasin et se rend dans Pélican Ville avec Jodi'], ['16:00', 'Rentre chez elle, dans la pièce à vivre'], ['21:00', 'Se couche']] },
      ] },
    ],
  },
  'gus': {
    intro: 'Pendant les heures d’ouverture du saloon, Gus se trouve derrière le comptoir. Il propose une variété de nourriture et de recettes à vendre. De 10:00 à midi, Gus parcourt souvent les rayons du Magasin général de Pierre, ou traîne dans le garde-manger du Centre communautaire. Gus passe son exament médical annuel à la Clinique d’Harvey en Automne, le 4.',
    groups: [
      { label: '', blocks: [
        { title: 'Jour 4 d’automne', rows: [['8:00', 'Dans sa chambre, assis sur le lit.'], ['10:30', 'Dans la salle d’attente de la Clinique d’Harvey regardant un poster.'], ['13:30', 'Se rend dans la salle d’examen de la clinique.'], ['16:00', 'Quitte la clinique pour aller tenir le bar.'], ['0:00', 'Va se coucher dans sa chambre.']] },
        { title: 'Jour de pluie', rows: [['8:00', 'Dans sa chambre, assis sur le lit.'], ['12:00', 'Lave des verres derrière le bar.'], ['16:30', 'Cesse de laver des verre et va tenir le bar.'], ['0:00', 'Va se coucher dans sa chambre.']] },
        { title: 'Lundi', rows: [['8:30', 'Quitte sa maison pour aller au Magasin général de Pierre.'], ['11:00', 'Retourne au Saloon pour tenir le bar.'], ['12:00', 'Va se coucher dans sa chambre.']] },
        { title: 'Mardi, centre communautaire restauré', rows: [['8:00', 'Dans sa chambre, assis sur le lit.'], ['8:30', 'Se rend dans la cuisine du centre communautaire'], ['12:30', 'Retourne au Saloon pour tenir le bar.'], ['0:00', 'Va se coucher dans sa chambre.']] },
        { title: 'Dimanche, après l’événement des 14 cœurs d’Alex', rows: [['8:00', 'Dans sa chambre, assis sur le lit.'], ['11:40', 'Se rend dans l’arrière-salle du Saloon.'], ['15:00', 'Retourne tenir le bar.'], ['0:00', 'Va se coucher dans sa chambre.']] },
        { title: 'Emploi du temps habituel', rows: [['8:00', 'Dans sa chambre, assis sur le lit.'], ['12:00', 'Lave des verres derrière le bar.'], ['16:30', 'Cesse de laver des verre et va tenir le bar.'], ['0:00', 'Va se coucher dans sa chambre.']] },
      ] },
    ],
  },
  'clint': {
    intro: 'Le commerce, la destruction de géodes ou l’amélioration d’outils ne sont plus disponibles chez Clint le Vendredi après que le Centre communautaire a été restauré (sauf quand il pleut).',
    groups: [
      { label: '', blocks: [
        { title: '15 d’Hiver', rows: [['9:00', 'Derrière le comptoir de la forge'], ['0:00', 'Rentre à la forge']] },
        { title: '16 d’Hiver', rows: [['9:00', 'Derrière le comptoir de la forge'], ['10:30', 'Quitte la forge et se rend à la Clinique d’Harvey'], ['0:00', 'Rentre chez lui']] },
        { title: 'Pluvieux', rows: [['9:00', 'Derrière le comptoir de la forge'], ['0:00', 'Rentre chez lui']] },
        { title: 'Vendredi (Centre communautaire restauré)', rows: [['8:50', 'Quitte sa maison, se rend dans la chaufferie du Centre communautaire'], ['0:00', 'Rentre chez lui']] },
        { title: 'Horaires réguliers', rows: [['9:00', 'Derrière le comptoir de la forge'], ['0:00', 'Rentre chez lui']] },
      ] },
    ],
  },
  'demetrius': {
    intro: 'Ci-dessous sont détaillés les horaires de Demetrius, priorisés de haut en bas. Par exemple, s’il pleut, les horaires de pluie prennent la priorité sur ceux d’en dessous Ses routines "Pluvieux" et "Vendredi" sont les mêmes chaque saison, mais sa "routine normale" change à chaque saison. Le 25 d’Été, il a un rendez-vous à la Clinique d’Harvey.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Jour pluvieux', rows: [['7:50', 'Chez lui, lit le journal dans la cuisine'], ['11:20', 'Chez lui, prend des notes dans son laboratoire'], ['15:40', 'Dans son laboratoire; devant le microscope'], ['18:10', 'Dans la cuisine, devant le frigo'], ['19:20', 'Dans la cuisine, devant le four'], ['20:20', 'Dans sa chambre']] },
        { title: 'Vendredi', rows: [['7:50', 'Chez lui, prend des notes dans son laboratoire'], ['17:50', 'Au Saloon, aux côtés de Robine'], ['19:20', 'Au Saloon, danse avec Robine'], ['22:50', 'Arrive chez lui avec Robine et va se coucher']] },
        { title: 'Routine normale de printemps', rows: [['7:50', 'Chez lui, dans la cuisine'], ['11:20', 'Chez lui, prend des notes devant son microscope'], ['14:40', 'Sur son porche'], ['19:40', 'Dans la cuisine, devant le frigo'], ['20:40', 'Dans la cuisine, devant le four'], ['21:20', 'Dans sa chambre'], ['22:30', 'Se couche']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Jour pluvieux', rows: [['7:50', 'Chez lui, lit le journal dans la cuisine'], ['11:20', 'Chez lui, prend des notes dans son laboratoire'], ['15:40', 'Dans son laboratoire; devant le microscope'], ['18:10', 'Dans la cuisine, devant le frigo'], ['19:20', 'Dans la cuisine, devant le four'], ['20:20', 'Dans sa chambre']] },
        { title: 'Jeudi 25', rows: [['8:40', 'Quitte sa maison'], ['10:10', 'Arrive à la clinique pour son examen'], ['13:20', 'Se rend dans la salle d’examen avec Harvey pour son examen'], ['15:30', 'Arrive chez lui']] },
        { title: 'Vendredi', rows: [['7:50', 'Chez lui, prend des notes dans son laboratoire'], ['17:50', 'Au Saloon, aux côtés de Robine'], ['19:20', 'Au Saloon, danse avec Robine'], ['22:50', 'Arrive chez lui avec Robine et va se coucher']] },
        { title: 'Routine normale d’été', rows: [['7:50', 'Chez lui, dans la cuisine (devant l’évier)'], ['11:00', 'Se rend à la fontaine, à l’Ouest du Centre Communautaire'], ['12:30', 'Arrive à la fontaine'], ['19:30', 'Arrive chez lui et se rend devant le frigo'], ['20:40', 'Dans la cuisine, devant le four'], ['20:50', 'Va dans sa chambre'], ['22:30', 'Se couche']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Jour pluvieux', rows: [['7:50', 'Chez lui, lit le journal dans la cuisine'], ['11:20', 'Chez lui, prend des notes dans son laboratoire'], ['15:40', 'Dans son laboratoire; devant le microscope'], ['18:10', 'Dans la cuisine, devant le frigo'], ['19:20', 'Dans la cuisine, devant le four'], ['20:20', 'Dans sa chambre']] },
        { title: 'Vendredi', rows: [['7:50', 'Chez lui, prend des notes dans son laboratoire'], ['17:50', 'Au Saloon, aux côtés de Robine'], ['19:20', 'Au Saloon, danse avec Robine'], ['22:50', 'Arrive chez lui avec Robine et va se coucher']] },
        { title: 'Routine normale d’automne', rows: [['7:50', 'Chez lui, dans la cuisine (devant l’évier)'], ['11:00', 'Sort de chez lui'], ['12:00', 'Sur la rive Nord du lac, près du pont menant aux Mines, prend des notes'], ['20:40', 'Dans la cuisine, devant le four'], ['20:50', 'Va dans sa chambre'], ['22:30', 'Se couche']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Jour pluvieux', rows: [['7:50', 'Chez lui, lit le journal dans la cuisine'], ['11:20', 'Chez lui, prend des notes dans son laboratoire'], ['15:40', 'Dans son laboratoire; devant le microscope'], ['18:10', 'Dans la cuisine, devant le frigo'], ['19:20', 'Dans la cuisine, devant le four'], ['20:20', 'Dans sa chambre']] },
        { title: 'Vendredi', rows: [['7:50', 'Chez lui, prend des notes dans son laboratoire'], ['17:50', 'Au Saloon, aux côtés de Robine'], ['19:20', 'Au Saloon, danse avec Robine'], ['22:50', 'Arrive chez lui avec Robine et va se coucher']] },
        { title: '16 d’Hiver', rows: [['7:50', 'Chez lui, lit le journal dans la cuisine'], ['11:20', 'Chez lui, prend des notes dans son laboratoire'], ['15:40', 'Quitte chez lui pour assister au Marché nocturne'], ['22:30', 'Quitte le marché nocturne et rentre chez lui']] },
      ] },
    ],
  },
  'nain': {
    intro: 'Le Nain vit à l’Est de l’entrée des Mines et ne bouge jamais d’ici.',
    groups: [
    ],
  },
  'george': {
    intro: 'Ci-dessous, les horaires de George sont classés par ordre de priorité, du plus élevé au plus bas (par exemple, lorsqu’il pleut, cet horaire l’emporte sur tous les autres en dessous). Le 23 de chaque saison, il a un rendez-vous à la Clinique d’Harvey, accompagné de Evelyn.',
    groups: [
      { label: '', blocks: [
        { title: 'Hiver 17', rows: [['6:30', 'A la maison, à regarder la télé.'], ['12:00', 'À sa table de cuisine.'], ['16:20', 'Quitte la maison pour se rendre au Marché nocturne.'], ['23:40', 'Quitte le marché nocturne pour rentrer chez lui.']] },
        { title: 'Mardi 23 (Toutes les saisons)', rows: [['6:30', 'À la maison, à table dans la cuisine.'], ['10:30', 'Quitte la maison pour se rendre à la salle d’attente de la Clinique d’Harvey.'], ['13:30', 'Se dirige vers la salle d’examen de gauche à l’intérieur de la Clinique.'], ['16:00', 'Quitte la Clinique pour regarder la télé à la maison.'], ['20:00', 'Va dans sa chambre pour la nuit.']] },
        { title: 'Jour de pluie', rows: [['6:30', 'A la maison, à regarder la télé.'], ['12:00', 'À sa table de cuisine.'], ['15:00', 'Retourne regarder la télé.'], ['20:00', 'Va dans sa chambre pour la nuit.']] },
        { title: 'Vendredi d’Été', rows: [['6:30', 'A la maison, à regarder la télé.'], ['12:00', 'Quitte la maison pour s’asseoir dehors, sous l’arbre à gauche de sa maison.'], ['15:00', 'Retourne chez lui pour regarder la télé.'], ['20:00', 'Va dans sa chambre pour la nuit.']] },
        { title: 'Dimanche, après l’événement d’Alex de 14 coeurs', rows: [['6:30', 'A la maison, à regarder la télé.'], ['11:00', 'Se rends dans l’arrière-salle du Saloon pour regarder du sport.'], ['15:00', 'Retourne chez lui pour regarder la télé.'], ['20:00', 'Va dans sa chambre pour la nuit.']] },
        { title: 'Dimanche', rows: [['6:30', 'A la maison, à regarder la télé.'], ['10:00', 'Quitte sa maison et se rend à la Statue de Yoba à l’intérieur de la maison de Pierre.'], ['14:00', 'Quitte la statue de Yoba et rentre chez lui pour regarder la télé.'], ['20:00', 'Va dans sa chambre pour la nuit.']] },
        { title: 'Calendrier régulier', rows: [['6:30', 'A la maison, à regarder la télé.'], ['12:00', 'À sa table de cuisine.'], ['15:00', 'Retourne regarder la télé.'], ['20:00', 'Va dans sa chambre pour la nuit.']] },
      ] },
    ],
  },
  'evelyn': {
    intro: 'On la trouve généralement dans la cuisine de sa maison ou en train de s’occuper des jardins du centre ville. Le 2 de chaque saison, elle a un rendez-vous à la Clinique d’Harvey, et le 23 de chaque saison, elle accompagne George à son rendez-vous.',
    groups: [
      { label: '', blocks: [
        { title: 'Mardi 2', rows: [['8:00', 'Dans sa cuisine.'], ['10:30', 'Quitte la maison pour s’asseoir dans la salle d’attente de la clinique d’Harvey.'], ['13:30', 'Se déplace vers la salle d’examen de gauche.'], ['16:00', 'Retourne chez elle de la clinique pour aller dans sa cuisine.'], ['19:00', 'Se dirige vers la bibliothèque de son salon.'], ['21:30', 'Va dans sa chambre.']] },
        { title: 'Mardi 23', rows: [['8:00', 'Dans sa cuisine.'], ['10:40', 'Quitte la maison pour attendre dans la clinique de Harvey avec George.'], ['13:30', 'Se déplace vers la salle d’examen de gauche avec George.'], ['16:10', 'Retourne chez elle de la clinique pour aller dans sa cuisine.'], ['19:00', 'Se dirige vers la bibliothèque de son salon.'], ['21:30', 'Va dans sa chambre.']] },
        { title: 'Jour de pluie', rows: [['8:00', 'Dans sa cuisine.'], ['10:40', 'Se tient à côté de la télé avec George.'], ['12:10', 'Se tient à table dans la cuisine.'], ['16:30', 'Dans sa cuisine, à côté des électroménagers.'], ['19:00', 'Se dirige vers la bibliothèque de son salon.'], ['21:30', 'Va dans sa chambre.']] },
        { title: 'Lundi, Jeudi, Samedi (centre communautaire réparé)', rows: [['8:00', 'Dans sa cuisine.'], ['10:40', 'Se tient à côté de la télé avec George.'], ['12:10', 'Se rend au centre communautaire pour s’asseoir dans le fauteuil de la salle d’artisanat.'], ['16:30', 'Dans sa cuisine, à côté des électroménagers.'], ['19:00', 'Se dirige vers la bibliothèque de son salon.'], ['21:30', 'Va dans sa chambre.']] },
        { title: 'Programme Quotidien d’Été', rows: [['8:00', 'Dans sa cuisine.'], ['10:40', 'Se tient à côté de la télé avec George.'], ['12:10', 'Se tient à table dans la cuisine.'], ['13:00', 'Va s’occuper des plantes au nord-ouest du centre-ville.'], ['16:30', 'Dans sa cuisine, à côté des électroménagers.'], ['19:00', 'Se dirige vers la bibliothèque de son salon.'], ['21:30', 'Va dans sa chambre.']] },
        { title: 'Programme Quotidien Normal', rows: [['8:00', 'Dans sa cuisine.'], ['10:40', 'Se tient à côté de la télé avec George.'], ['12:10', 'Se tient à table dans la cuisine.'], ['13:00', 'Va s’occuper des plantes au sud-est du centre-ville.'], ['16:30', 'Dans sa cuisine, à côté des électroménagers.'], ['19:00', 'Se dirige vers la bibliothèque de son salon.'], ['21:30', 'Va dans sa chambre.']] },
      ] },
    ],
  },
  'harvey': {
    intro: 'Les Mardis et Jeudis, Harvey reçoit les villageois pour leur examen médical annuel/trimestriel. Les autres jours, il s’occupe généralement de tenir l’accueil de la clinique le matin, et se dégourdit les jambes l’après-midi. Les jours pluvieux, Harvey quitte la clinique et se rend dans sa chambre à midi, qu’il y aie ou non des clients. Plus tard, il passe au Saloon. Les horaires d’Harvey sont énumérés ci-dessous par ordre de priorité. Par exemple, s’il pleut, cet horaire remplace tous les autres.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Pluvieux', rows: [['8:00', 'Dans sa chambre'], ['8:40', 'Travaille à la clinique'], ['12:00', 'Monte dans sa chambre et s’assied devant la radio'], ['16:00', 'Va vers sa bibliothèque pour lire'], ['17:30', 'Se rend au Saloon du fruit étoilé'], ['22:00', 'Retourne chez lui et se couche']] },
        { title: 'Mardi & Jeudi', rows: [['7:30', 'Dans la salle d’examen de sa clinique'], ['12:50', 'Se rend dans la salle d’attente'], ['13:30', 'Retourne dans la salle d’examen'], ['16:30', 'Travaille à la clinique'], ['18:00', 'Monte dans sa chambre et se tient devant sa bibliothèque'], ['23:00', 'Se couche']] },
        { title: 'Vendredi', rows: [['7:00', 'Se tient devant son frigo, dans sa chambre'], ['8:30', 'Travaille à la clinique'], ['12:00', 'Se rend au Magasin général de Pierre'], ['15:00', 'Retourne dans sa chambre'], ['22:00', 'Se couche']] },
        { title: 'Horaire régulier', rows: [['7:00', 'Se tient devant son frigo, dans sa chambre'], ['8:30', 'Travaille à la clinique'], ['12:00', 'Se ballade dans le parc à gauche de la place de la ville'], ['17:30', 'Rentre à la clinique, se tient à droite du bureau'], ['18:40', 'Monte dans sa chambre et lit en face de sa bibliothèque'], ['22:00', 'Se couche']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Pluvieux', rows: [['8:00', 'Dans sa chambre'], ['8:40', 'Travaille à la clinique'], ['12:00', 'Monte dans sa chambre et s’assied devant la radio'], ['16:00', 'Va vers sa bibliothèque pour lire'], ['17:30', 'Se rend au Saloon du fruit étoilé'], ['22:00', 'Retourne chez lui et se couche']] },
        { title: 'Mardi & Jeudi', rows: [['7:30', 'Dans la salle d’examen de sa clinique'], ['12:50', 'Se rend dans la salle d’attente'], ['13:30', 'Retourne dans la salle d’examen'], ['16:30', 'Travaille à la clinique'], ['18:00', 'Monte dans sa chambre et lit en face de sa bibliothèque'], ['23:00', 'Se couche']] },
        { title: 'Vendredi', rows: [['7:00', 'Se tient devant son frigo, dans sa chambre'], ['8:30', 'Travaille à la clinique'], ['12:00', 'Se rend au Magasin général de Pierre'], ['15:00', 'Retourne dans sa chambre'], ['22:00', 'Se couche']] },
        { title: 'Horaire régulier', rows: [['7:00', 'Se tient devant son frigo, dans sa chambre'], ['8:30', 'Travaille à la clinique'], ['12:00', 'Se rend au Sud de la fontaine, à gauche du Centre communautaire'], ['17:30', 'Rentre à la clinique, se tient à droite du bureau'], ['18:40', 'Monte dans sa chambre et lit devant sa bibliothèque'], ['22:00', 'Se couche']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Pluvieux', rows: [['8:00', 'Dans sa chambre'], ['8:40', 'Travaille à la clinique'], ['12:00', 'Monte dans sa chambre et s’assied devant la radio'], ['16:00', 'Va vers sa bibliothèque pour lire'], ['17:30', 'Se rend au Saloon du fruit étoilé'], ['22:00', 'Retourne chez lui et se couche']] },
        { title: 'Mardi & Jeudi', rows: [['7:30', 'Dans la salle d’examen de sa clinique'], ['12:50', 'Se rend dans la salle d’attente'], ['13:30', 'Retourne dans la salle d’examen'], ['16:30', 'Travaille à la clinique'], ['18:00', 'Monte dans sa chambre et lit en face de sa bibliothèque'], ['23:00', 'Se couche']] },
        { title: 'Vendredi', rows: [['7:00', 'Se tient devant son frigo, dans sa chambre'], ['8:30', 'Travaille à la clinique'], ['12:00', 'Se rend au Magasin général de Pierre'], ['15:00', 'Retourne dans sa chambre'], ['22:00', 'Se couche']] },
        { title: 'Horaire régulier', rows: [['7:00', 'Se tient devant son frigo, dans sa chambre'], ['8:30', 'Travaille à la clinique'], ['12:00', 'Marche en ville, se tient à côté d’un arbre à gauche du pont menant à la plage'], ['17:00', 'Retourne dans sa chambre, s’assied devant la radio'], ['22:00', 'Se couche']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Lundi, 15 d’Hiver', rows: [['8:00', 'Se tient devant le micro-ondes, dans sa chambre'], ['8:40', 'Travaille à la clinique'], ['12:00', 'Monte dans sa chambre et s’assied devant la radio'], ['16:00', 'Va vers sa bibliothèque'], ['17:00', 'Se rend à la plage pour rejoindre le Marché nocturne'], ['12:00', 'Retourne chez lui et se couche']] },
        { title: 'Pluvieux', rows: [['8:00', 'Dans sa chambre'], ['8:40', 'Travaille à la clinique'], ['12:00', 'Monte dans sa chambre et s’assied devant la radio'], ['16:00', 'Va vers sa bibliothèque pour lire'], ['17:30', 'Se rend au Saloon du fruit étoilé'], ['22:00', 'Retourne chez lui et se couche']] },
        { title: 'Mardi & Jeudi', rows: [['7:30', 'Dans la salle d’examen de sa clinique'], ['12:50', 'Se rend dans la salle d’attente'], ['13:30', 'Retourne dans la salle d’examen'], ['16:30', 'Travaille à la clinique'], ['18:00', 'Monte dans sa chambre et lit en face de sa bibliothèque'], ['23:00', 'Se couche']] },
        { title: 'Vendredi', rows: [['7:00', 'Se tient devant son frigo, dans sa chambre'], ['8:30', 'Travaille à la clinique'], ['12:00', 'Se rend au Magasin général de Pierre'], ['15:00', 'Retourne dans sa chambre'], ['22:00', 'Se couche']] },
        { title: 'Horaire régulier', rows: [['8:00', 'Dans sa chambre'], ['8:40', 'Travaille à la clinique'], ['12:00', 'Monte dans sa chambre et s’assied devant la radio'], ['16:00', 'Va vers sa bibliothèque pour lire'], ['17:30', 'Se rend au Saloon du fruit étoilé'], ['22:00', 'Retourne chez lui et se couche']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['8:30', 'Quitte la maison de ferme et se rend au Magasin général de Pierre'], ['12:00', 'Se rend à la fontaine à droite du Centre communautaire'], ['17:00', 'Quitte la ville et rentre à la ferme']] },
        { title: 'Mardi & Jeudi', rows: [['6:30', 'Quitte la maison de ferme et se rend à la clinique'], ['18:00', 'Quitte la clinique et rentre à la maison']] },
      ] },
    ],
  },
  'leah': {
    intro: 'Chaque jour Leah se réveille à 10:00 et commence la journée en sculptant chez elle. Sauf si le joueur a au moins deux cœurs d’Amitié avec elle, il est impossible de rentrer dans sa maison. A 12:00, après avoir sculpté, elle sort parfois dessiner à côté de la mare dans la Forêt Sève-Cendreuse, au Magasin général de Pierre, ou occasionnellement à La plage durant l’été. Pendant les jours pluvieux de Printemps, Leah va au Saloon du fruit étoilé à 16:00. Le 16e jour de Printemps, elle a un rendez-vous à la Clinique d’Harvey.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Printemps 15 (Bus restauré)', rows: [['10:40', 'Monte à bord du bus pour Désert de Calico pour assister au Festival du désert'], ['11:20', 'Se tient près de la sculpture au sud de la ligne de course']] },
        { title: 'Horaire', rows: [['11:10', 'Monte à bord du bus pour Désert de Calico.'], ['11:30', 'Arrive à son Stand'], ['0:00', 'Quittes sont stand et monte à bord du bus pour retourner à la Vallée']] },
        { title: 'Planning normal', rows: [['9:00', 'Se réveille et sculpte chez elle.'], ['12:00', 'Sort de sa maison et se rend à l’Ouest, à la mare de la forêt. Observe l’eau depuis la rive Est de la mare.'], ['15:00', 'Quitte la mare et se rend autre part dans la forêt pour dessiner.'], ['18:30', 'Retourne à la mare. Observe l’eau depuis la rive Ouest.'], ['19:30', 'Quitte la forêt et retourne chez elle.'], ['22:00', 'Se déplace chez elle.'], ['0:00', 'Se couche.']] },
        { title: '16 de Printemps', rows: [['9:00', 'Sculpte chez elle'], ['10:30', 'Se dirige vers la salle d’attend de la Clinique d’Harvey'], ['13:30', 'Se déplace de la salle d’attente vers la salle d’examen de gauche dans la clinique'], ['16:00', 'Quitte la clinique et marche vers le Saloon du fruit étoilé'], ['23:40', 'Quitte le saloon pour retourner chez elle et dormir']] },
        { title: 'Lundi', rows: [['11:00', 'Quitte chez elle'], ['12:30', 'Magasin général de Pierre']] },
        { title: 'Mardi', rows: [['13:00', 'Observe la rivière à côté de chez elle.'], ['16:00', 'Dessine sur le ponton de la mare dans la forêt.'], ['23:30', 'Saloon du fruit étoilé']] },
        { title: 'Mercredi', rows: [['12:00', 'Quitte chez elle.'], ['12:50', 'S’assied sur le banc de la rivière, près de la mare.'], ['15:00', 'Se rend à la mare.'], ['15:50', 'Dessine sur le ponton de la mare dans la forêt.'], ['18:30', 'Se rend sur la rive Ouest de la mare.'], ['18:50', 'Reste sur la rive Ouest.'], ['19:30', 'Rentre chez elle.'], ['20:40', 'Arrive chez elle.']] },
        { title: 'Jeudi', rows: [['12:00', 'Quitte chez elle.'], ['12:30', 'Observe la rivière près de chez elle.'], ['21:00', 'Arrive chez elle.']] },
        { title: 'Vendredi', rows: [['14:00', 'Chez elle'], ['18:30', 'Saloon du fruit étoilé']] },
        { title: 'Samedi', rows: [['15:00', 'Chez elle'], ['21:00', 'Saloon du fruit étoilé'], ['23:50', 'Quitte le saloon et rentre chez elle.']] },
        { title: 'Dimanche', rows: [['12:30', 'Observe la rivière près de chez elle.'], ['16:00', 'Dessine sur le ponton de la mare dans la forêt.'], ['18:50', 'Reste sur la rive Ouest de la mare.']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Pluie Verte (Année 1)', rows: [['6:10', 'Se tient devant chez elle.'], ['13:00', 'Se tient chez elle, à côté de son lit.'], ['22:00', 'Dans son lit']] },
        { title: 'Planning normal', rows: [['10:00', 'Se réveille et sculpte, chez elle.'], ['12:00', 'Quitte chez elle et marche à travers la ville pour se rendre à La plage pour dessiner (arrive à la plage vers 13:00).'], ['19:00', 'Quitte la plage et rentre chez elle.'], ['22:00', 'Se déplace chez elle.'], ['0:00', 'Se couche.']] },
        { title: 'Lundi', rows: [['10:00', 'Chez elle.'], ['12:30', 'Arrive au Magasin général de Pierre.'], ['14:30', 'Magasin général de Pierre'], ['17:00', 'Quitte le Magasin général de Pierre.']] },
        { title: 'Mardi - Jeudi, Dimanche', rows: [['10:00', 'Chez elle.'], ['14:00', 'La plage.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Dimanche', rows: [['10:00', 'Se réveille et sculpte, chez elle.'], ['12:00', 'Quitte sa maison et marche à travers la ville vers le côté Est de la rivière.'], ['14:00', 'Arrive au côté Est de la rivière au dessus du Forgeron, observe l’eau.'], ['19:00', 'Retourne chez elle.'], ['21:10', 'Arrive chez elle.']] },
        { title: 'Lundi', rows: [['10:00', 'Se réveille et sculpte, chez elle.'], ['11:00', 'Quitte chez elle et se rend au Magasin général de Pierre.'], ['12:30', 'Arrive au Magasin général de Pierre.'], ['17:00', 'Retourne chez elle.'], ['18:30', 'Arrive chez elle.']] },
        { title: 'Mardi, Mercredi & Jeudi', rows: [['10:00', 'Se réveille et sculpte, chez elle.'], ['12:00', 'Quitte sa maison et marche à travers la ville vers le côté Est de la rivière.'], ['14:00', 'Arrive au côté Est de la rivière au dessus du Forgeron, observe l’eau.'], ['19:00', 'Retourne chez elle.'], ['21:00', 'Arrive chez elle.']] },
        { title: 'Vendredi & Samedi', rows: [['10:00', 'Se réveille et sculpte, chez elle.'], ['16:00', 'Quitte sa maison et marche à travers la ville vers le Saloon du fruit étoilé.'], ['17:30', 'Arrive au Saloon.'], ['23:40', 'Retourne chez elle.'], ['1:00', 'Arrive chez elle..']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Lundi', rows: [['10:00', 'Se réveille et sculpte, chez elle.'], ['11:00', 'Quitte sa maison et marche à travers la ville vers le Magasin général de Pierre.'], ['12:30', 'Arrive au Magasin général.'], ['17:00', 'Retourne chez elle.'], ['18:30', 'Arrive chez elle.']] },
        { title: 'Mardi à Dimanche', rows: [['10:00', 'Se réveille et sculpte, chez elle.'], ['16:00', 'Quitte sa maison et marche à travers la ville vers le Saloon du fruit étoilé.'], ['17:30', 'Arrive au Saloon.'], ['23:40', 'Retourne chez elle pour la soirée.'], ['1:00', 'Arrive chez elle.']] },
      ] },
      { label: 'Exceptions', blocks: [
        { title: 'Pluie', rows: [['10:00', 'Se réveille et sculpte, chez elle.'], ['12:00', 'Se déplace chez elle.'], ['14:00', 'Continue de se déplacer, chez elle.'], ['16:00', 'Quitte chez elle et marche à travers la ville vers le Saloon du fruit étoilé.'], ['23:40', 'Quitte le saloon et rentre chez elle pour la soirée.']] },
        { title: '16 de Printemps', rows: [['9:00', 'Se réveille et sculpte, chez elle.'], ['10:30', 'Quitte chez elle et marche à travers la ville vers la Clinique d’Harvey pour son rendez-vous annuel. "Bonjour, vous venez voir le docteur ?"'], ['13:30', 'Continue son rendez-vous à la clinique. "Tout a l’air d’aller, Docteur Harvey ?"'], ['16:00', 'Quitte la clinique et se rend au Saloon du fruit étoilé.'], ['23:40', 'Quitte le saloon et rentre chez elle.']] },
        { title: 'Mardi', rows: [['9:00', 'Se réveille et sculpte, chez elle.'], ['11:00', 'Quitte chez elle et marche à travers la ville vers le Magasin général de Pierre.'], ['17:00', 'Rentre chez elle.'], ['22:00', 'Se déplace chez elle.'], ['0:00', 'Se couche.']] },
        { title: 'Vendredi-Samedi', rows: [['10:00', 'Se réveille et sculpte, chez elle.'], ['12:00', 'Se déplace chez elle.'], ['14:00', 'Continue de se déplacer, chez elle.'], ['16:00', 'Quitte chez elle et marche à travers la ville vers le Saloon du fruit étoilé.'], ['23:40', 'Rentre chez elle pour la soirée.']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['6:00', 'Dans la maison.'], ['8:00', 'Se rend au pont près de l’îlot au Sud de chez elle.'], ['11:00', 'Près du pont sur l’îlot au sud de chez elle.'], ['15:00', 'Se rend chez elle.'], ['15:20', 'Devant la porte de chez elle.'], ['17:30', 'Rentre à la maison.'], ['19:20', 'Arrive à la maison de ferme.'], ['22:00', 'Au lit.']] },
      ] },
    ],
  },
  'maru': {
    intro: '',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['13:30', 'Se dirige vers le banc au sud du Saloon.'], ['15:20', 'Assise sur le banc au sud du Saloon.'], ['18:30', 'Rentre chez elle.'], ['20:30', 'Dans sa chambre.'], ['23:00', 'Va au lit.']] },
        { title: 'Mardi', rows: [['8:00', 'Quitte sa maison et se dirige vers la clinique d’Harvey.'], ['9:20', 'Travaille à la clinique d’Harvey comme infirmière.'], ['16:45', 'Quitte la clinique et rentre chez elle.'], ['18:30', 'Dans la cuisine.'], ['22:20', 'Dans sa chambre.'], ['0:00', 'Va au lit.']] },
        { title: 'Mercredi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['15:00', 'Assise sur le banc à l’est du Centre communautaire.'], ['18:00', 'Rentre chez elle.'], ['19:00', 'Dans sa chambre.'], ['22:00', 'Va au lit.']] },
        { title: 'Jeudi', rows: [['8:00', 'Quitte sa maison et se dirige vers la clinique d’Harvey.'], ['9:20', 'Travaille à la clinique d’Harvey comme infirmière.'], ['16:45', 'Rentre chez elle.'], ['18:30', 'Dans la cuisine.'], ['22:20', 'Dans sa chambre.'], ['0:00', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['15:00', 'Assise sur le banc à l’est du Centre communautaire.'], ['18:00', 'Rentre chez elle.'], ['19:00', 'Dans sa chambre.'], ['22:00', 'Va au lit.']] },
        { title: 'Samedi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['15:00', 'Assise sur le banc à l’est du Centre communautaire.'], ['18:00', 'Rentre chez elle.'], ['19:00', 'Dans sa chambre.'], ['22:00', 'Va au lit.']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['13:30', 'Se dirige vers le banc au sud du Saloon.'], ['15:20', 'Assise sur le banc au sud du Saloon.'], ['18:30', 'Rentre chez elle.'], ['20:30', 'Dans sa chambre.'], ['23:00', 'Va au lit.']] },
        { title: 'Jours pluvieux', rows: [['9:00', 'Dans sa chambre.'], ['12:50', 'Dans le magasin de la Scierie.'], ['14:40', 'Dans le laboratoire.'], ['16:40', 'Dans sa chambre.'], ['23:00', 'Va au lit.']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['13:30', 'Se dirige vers le banc au sud du Saloon.'], ['15:20', 'Assise sur le banc au sud du Saloon.'], ['18:30', 'Rentre chez elle.']] },
        { title: 'Mardi', rows: [['7:50', 'Quitte sa maison et se dirige vers la clinique d’Harvey.'], ['9:40', 'Travaille à la clinique d’Harvey comme infirmière.'], ['16:45', 'Rentre chez elle.'], ['18:40', 'Dans la cuisine.'], ['22:00', 'Dans sa chambre.'], ['0:00', 'Va au lit.']] },
        { title: 'Mercredi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Quitte sa maison et se dirige vers le lac à l’est de la Scierie.'], ['14:40', 'Reste au lac à l’est de la Scierie..'], ['19:00', 'Rentre chez elle.'], ['19:30', 'En-dehors de la maison, regarde à travers un télescope.'], ['0:00', 'Va au lit.']] },
        { title: 'Jeudi', rows: [['7:50', 'Quitte sa maison et se dirige vers la clinique d’Harvey.'], ['9:40', 'Travaille à la clinique d’Harvey comme infirmière.'], ['16:45', 'Rentre chez elle.'], ['18:40', 'Dans la cuisine.'], ['22:00', 'Dans sa chambre.'], ['0:00', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Quitte sa maison et se dirige vers le lac à l’est de la Scierie.'], ['14:40', 'Reste au lac à l’est de la Scierie.'], ['19:00', 'Rentre chez elle.'], ['19:40', 'En-dehors de la maison, regarde à travers un télescope.'], ['0:00', 'Va au lit.']] },
        { title: 'Samedi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Quitte sa maison et se dirige vers le lac à l’est de la Scierie.'], ['14:40', 'Au lac à l’est de la Scierie.'], ['19:00', 'Rentre chez elle.'], ['19:40', 'En-dehors de la maison, regarde à travers un télescope.'], ['0:00', 'Va au lit.']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['13:30', 'Se dirige vers le banc au sud du Saloon.'], ['15:20', 'Assise sur le banc au sud du Saloon.'], ['18:30', 'Rentre chez elle.'], ['20:10', 'Arrive chez elle.']] },
        { title: 'Jours pluvieux', rows: [['9:00', 'Dans sa chambre.'], ['12:30', 'Dans le magasin de la Scierie.'], ['14:30', 'Dans le laboratoire.'], ['16:30', 'Dans sa chambre.'], ['23:00', 'Va au lit.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['13:30', 'Se dirige vers le banc au sud du Saloon.'], ['15:20', 'Assise sur le banc au sud du Saloon.'], ['18:30', 'Rentre chez elle.']] },
        { title: 'Mardi', rows: [['7:50', 'Quitte sa maison et se dirige vers la clinique d’Harvey.'], ['9:40', 'Travaille à la clinique d’Harvey comme infirmière.'], ['16:45', 'Rentre chez elle.'], ['18:40', 'Dans la cuisine.'], ['22:00', 'Dans sa chambre.'], ['0:00', 'Va au lit.']] },
        { title: 'Mercredi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['15:00', 'Assise sur le banc à l’est du Centre communautaire.'], ['18:00', 'Rentre chez elle.'], ['19:10', 'Dans sa chambre.'], ['22:00', 'Va au lit.']] },
        { title: 'Jeudi', rows: [['7:50', 'Quitte sa maison et se dirige vers la clinique d’Harvey.'], ['9:40', 'Travaille à la clinique d’Harvey comme infirmière.'], ['16:45', 'Rentre chez elle.'], ['18:40', 'Dans la cuisine.'], ['22:00', 'Dans sa chambre.'], ['0:00', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['15:00', 'Assise sur le banc à l’est du Centre communautaire.'], ['18:00', 'Rentre chez elle.'], ['19:10', 'Dans sa chambre.'], ['22:00', 'Va au lit.']] },
        { title: 'Samedi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['15:00', 'Assise sur le banc à l’est du Centre communautaire.'], ['18:00', 'Rentre chez elle.'], ['19:10', 'Dans sa chambre.'], ['22:00', 'Va au lit.']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['13:30', 'Se dirige vers le banc au sud du Saloon.'], ['15:20', 'Assise sur le banc au sud du Saloon.'], ['18:30', 'Rentre chez elle.']] },
        { title: 'Jours pluvieux', rows: [['9:00', 'Dans sa chambre.'], ['12:30', 'Dans le magasin de la Scierie.'], ['14:30', 'Dans le laboratoire.'], ['16:30', 'Dans sa chambre.'], ['23:00', 'Va au lit.']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Lundi', rows: [['10:00', 'Quitte sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['13:30', 'Se dirige vers le banc au sud du Saloon.'], ['15:30', 'Assise sur le banc au sud du Saloon.'], ['18:30', 'Rentre chez elle.']] },
        { title: 'Mardi', rows: [['7:50', 'Quitte sa maison et se dirige vers la clinique d’Harvey.'], ['9:40', 'Travaille à la clinique d’Harvey comme infirmière.'], ['16:45', 'Rentre chez elle.'], ['18:40', 'Dans la cuisine.'], ['22:00', 'Dans sa chambre.']] },
        { title: 'Mercredi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:40', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['18:00', 'Rentre chez elle.'], ['18:40', 'Dans la cuisine.'], ['22:00', 'Dans sa chambre.'], ['0:00', 'Va au lit.']] },
        { title: 'Jeudi', rows: [['7:40', 'Quitte sa maison et se dirige vers la clinique d’Harvey.'], ['9:40', 'Travaille à la clinique d’Harvey comme infirmière.'], ['16:45', 'Rentre chez elle.'], ['18:40', 'Dans la cuisine.'], ['22:00', 'Dans sa chambre.'], ['0:00', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Dans sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:10', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['15:00', 'Assise sur le banc à l’est du Centre communautaire.'], ['18:00', 'Quitte le banc rentre chez elle.'], ['19:10', 'Dans sa chambre.'], ['22:00', 'Va au lit.']] },
        { title: 'Samedi', rows: [['10:00', 'Quitte sa chambre.'], ['10:20', 'Dans le laboratoire.'], ['14:00', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['15:00', 'Assise sur le banc à l’est du Centre communautaire.'], ['18:00', 'Rentre chez elle.'], ['19:00', 'Dans sa chambre, travaille sur sa "machine".'], ['22:00', 'Va au lit.']] },
        { title: 'Dimanche', rows: [['14:00', 'Quitte sa maison.'], ['15:30', 'Assise sur le banc au sud du Saloon.'], ['18:30', 'Rentre chez elle.']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['6:00', 'Chez elle.'], ['8:00', 'Se dirige vers le magasin de la Scierie.'], ['10:00', 'Dans le magasin de la Scierie.'], ['14:00', 'Se dirige vers le banc à l’est du Centre communautaire.'], ['15:00', 'Assise sur le banc à l’est du Centre communautaire.'], ['18:00', 'Rentre chez elle.'], ['19:30', 'Chez elle.']] },
        { title: 'Mardi & Jeudi', rows: [['7:30', 'Quitte sa maison et se dirige vers la clinique d’Harvey.'], ['9:00', 'Travaille à la clinique d’Harvey comme infirmière.'], ['14:00', 'Quitte la caisse enregistreuse et se tient dans la salle d’attente en regardant les dossiers.'], ['16:40', 'Rentre à la ferme.']] },
      ] },
    ],
  },
  'lewis': {
    intro: '',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi', rows: [['11:00', 'Marche à la (Poissonnerie ou au Magasin général de Pierre ou alors à la Scierie)']] },
        { title: 'Mardi', rows: [['10:00', 'Se réveille et sort du Manoir'], ['10:10', 'Fait du jardinage devant le Manoir'], ['11:30', 'Arrête de jardiner et se dirige vers le Magasin général de Pierre'], ['12:20', 'Entre au Magasin général de Pierre'], ['16:50', 'Entre au manoir et fixe la cuisinière (probablement en train de cuisiner)']] },
        { title: 'Mercredi - Centre Communautaire non restauré', rows: [['10:00', 'Se réveille et sort du Manoir']] },
        { title: 'Jeudi - Centre Communautaire non restauré', rows: [['8:30', 'Debout dans la cuisine de son Manoir'], ['10:00', 'Quitte son Manoir'], ['10:10', 'Fait du jardinage devant le Manoir'], ['11:30', 'Arrête de jardiner et est en face de Magasin général de Pierre'], ['12:30', 'Debout devant l’arbre à gauche de la Clinique'], ['16:30', 'Arrive à son Manoir pour la nuit']] },
        { title: 'Jeudi - Centre Communautaire restauré', rows: [['12:00', 'Quitte son Manoir pour aller au Centre communautaire'], ['18:30', 'Quitte le Centre communautaire et se dirige vers son Manoir'], ['19:30', 'Arrive à son Manoir et est debout dans sa cuisine']] },
        { title: 'Vendredi', rows: [['10:00', 'Se réveille et sort du Manoir'], ['10:10', 'Fait du jardinage devant le Manoir'], ['11:40', 'Arrête de jardiner et se dirige vers le Magasin général de Pierre'], ['12:30', 'Debout devant l’arbre à gauche de la Clinique'], ['21:30', 'Dans le Saloon du fruit étoilé'], ['23:10', 'Retourne à son Manoir']] },
        { title: 'Samedi', rows: [['8:30', 'Debout dans la cuisine de son Manoir'], ['10:00', 'Quitte son Manoir et se dirige vers le Forgeron'], ['11:00', 'Arrive chez le Forgeron'], ['13:20', 'Arrive au Musée'], ['16:40', 'Arrive à son Manoir pour aller au lit']] },
        { title: 'Dimanche', rows: [['11:00', 'Fait du jardinage devant le Manoir'], ['12:30', 'Debout devant l’arbre à gauche de la Clinique'], ['16:30', 'Dans le Manoir']] },
        { title: 'Dimanche - Centre communautaire restauré', rows: [['11:50', 'Arrive au Centre communautaire'], ['12:20', 'Fixe du regard le Coffre-fort du Centre communautaire']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Lundi', rows: [['8:30', 'Se trouve au manoir debout dans sa cuisine.'], ['10:00', 'Quitte le manoir.'], ['11:00', 'Entre dans une boutique (chez Willy, Pierre, ou Robine).'], ['16:00', 'Quitte la boutique.'], ['17:30', '(L’heure exacte est à vérifier, elle n’est pas à 17h comme le suggère le wiki anglais) Rentre au manoir et reste devant sa cuisine.'], ['21:00', 'Se déplace de sa cuisine jusqu’au livre de données de Pelican Ville.'], ['22:00', 'Va au lit.']] },
        { title: 'Mardi', rows: [['8:30', 'Debout dans sa cuisine'], ['10:00', 'S’occupe de son jardin'], ['11:30', 'Arrête de jardiner et se dirige vers le Magasin général de Pierre'], ['12:20', 'Arrive au Magasin général de Pierre'], ['16:40', 'Debout dans la cuisine de son Manoir']] },
        { title: 'Jeudi', rows: [['8:30', 'Debout dans sa cuisine'], ['10:00', 'Marche dehors pour s’occuper de son jardin'], ['11:40', 'Marche jusqu’à la place du village'], ['12:30', 'Debout devant l’arbre à gauche de la Clinique']] },
        { title: 'Vendredi', rows: [['11:00', 'Travaille dans son parterre de fleurs'], ['11:40', 'Quitte son Manoir'], ['12:30', 'Debout devant l’arbre à gauche de la Clinique']] },
        { title: 'Samedi', rows: [['10:00', 'Sort de chez lui'], ['10:50', 'Perçoit l’impôt sur les sociétés auprès du Forgeron'], ['13:20', 'Arrive au Musée'], ['16:50', 'Retourne à son Manoir (sûrement en train de cuisiner)']] },
        { title: 'Dimanche', rows: [['10:00', 'Quitte son manoir'], ['10:10', 'Est en train de jardiner devant chez lui'], ['16:50', 'Entre dans son Manoir']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Lundi', rows: [['8:30', 'Debout dans la cuisine de son Manoir'], ['10:00', 'Sort de chez lui; commence à marcher vers la Scierie'], ['11:50', 'Arrive à l’intérieur de la Scierie'], ['16:50', 'Debout dans la cuisine de son Manoir']] },
        { title: 'Mardi 9', rows: [['8:30', 'Debout dans la salle à manger de son Manoir'], ['10:30', 'Arrive chez Marnie'], ['11:00', 'Quitte le Ranch de Marnie'], ['12:30', 'Entre dans la Clinique'], ['17:30', 'Arrive chez Marnie et fixe le micro-ondes (sûrement en train de cuisiner)'], ['20:20', 'Va dans le lit de Marnie']] },
        { title: 'Mercredi', rows: [['8:30', 'Debout dans la cuisine de son Manoir'], ['10:00', 'Fait du jardinage devant chez lui'], ['11:40', 'Quitte son Manoir'], ['12:30', 'Debout devant l’arbre à gauche de la Clinique'], ['13:50', 'Se dirige vers le Magasin général de Pierre'], ['16:30', 'Debout dans la cuisine de son Manoir']] },
        { title: 'Jeudi', rows: [['16:40', 'Arrive à son Manoir']] },
        { title: 'Vendredi', rows: [['12:30', 'Debout devant l’arbre à gauche de la Clinique'], ['14:30', 'Debout devant la fontaine près du Centre communautaire'], ['17:50', 'Arrive au Saloon du fruit étoilé'], ['23:30', 'Arrive à son Manoir']] },
        { title: 'Samedi', rows: [['8:30', 'Chez lui, dans sa cuisine'], ['10:00', 'Fait du jardinage devant chez lui'], ['11:30', 'Quitte son Manoir'], ['12:30', 'Debout devant l’arbre à gauche de la Clinique'], ['13:50', 'Commence à marcher vers le Magasin général de Pierre'], ['16:30', 'Chez lui, dans sa cuisine']] },
        { title: 'Dimanche', rows: [['9:30', 'Jardine devant chez lui'], ['11:00', 'Marche vers la rivière près de la cabane de Leah'], ['13:30', 'Debout près de la rivière à côté de chez Leah'], ['17:30', 'Est dans son Manoir']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Lundi', rows: [['11:00', 'Arrive au magasin de Willy'], ['16:30', 'Quitte la plage pour retourner à son Manoir']] },
        { title: 'Mardi', rows: [['8:30', 'Se réveille'], ['10:00', 'Debout devant son Manoir'], ['10:40', 'Bouge vers son jardin'], ['11:40', 'Commence à se diriger vers Magasin général de Pierre'], ['12:20', 'Arrive près du Magasin général de Pierre'], ['16:40', 'Rentre chez lui']] },
        { title: 'Mercredi', rows: [['16:30', 'Rentre chez lui']] },
        { title: 'Jeudi', rows: [['10:00', 'Sort de chez lui pour faire du jardinage'], ['11:30', 'Se dirige vers la Clinique'], ['12:30', 'Debout devant l’arbre à gauche de la Clinique'], ['16:30', 'Arrive à son Manoir']] },
        { title: 'Vendredi', rows: [['8:30', 'Est à l’intérieur de son manoir'], ['10:00', 'Commence à jardiner'], ['11:30', 'Se déplace vers l’arbre à gauche de la Clinique'], ['14:30', 'Arrive à la fontaine'], ['17:50', 'Entre au Saloon'], ['23:20', 'Entre chez lui']] },
        { title: 'Samedi', rows: [['8:30', 'Dans son Manoir'], ['10:00', 'Quitte son Manoir et se dirige chez le Forgeron'], ['10:50', 'Entre chez le Forgeron'], ['16:40', 'Entre chez lui']] },
      ] },
      { label: 'Exceptions', blocks: [
        { title: 'Pluie', rows: [['8:30', 'Son Manoir est ouvert. Lewis est dans sa cuisine.'], ['14:30', 'Arrive au Saloon du fruit étoilé.'], ['19:40', 'Quitte sa cuisine et va au lit. Son Manoir est verrouillé.']] },
        { title: 'Lundi, Mercredi, Jeudi, Dimanche (Centre communautaire Restauré)', rows: [['8:30', 'Son Manoir est ouvert. Lewis est dans sa cuisine.'], ['9:00', 'Fait du jardinage devant chez lui. Se déplace du côté Est à 9h40 du matin.'], ['10:40', 'Quitte son Manoir'], ['11:40', 'Entre dans le Centre communautaire.'], ['12:10', 'Debout dans la salle du Coffre dans le Centre communautaire.'], ['18:30', 'Quitte le Centre communautaire pour aller à son Manoir.'], ['19:40', 'Arrive chez lui. Va à sa cuisine.']] },
      ] },
    ],
  },
  'kent': {
    intro: 'Ci-dessous, le calendrier de Kent, hiérarchisé de haut en bas. Par exemple, s’il pleut, ce programme remplace tous les programmes en-dessous.',
    groups: [
      { label: '', blocks: [
        { title: 'Jour de pluie', rows: [['6:00', 'Dans la maison'], ['14:00', 'Quitte la maison, se tient sous un arbre au nord de la maison'], ['15:00', 'Retourne à la maison, se tient dans l’entrée'], ['19:00', 'Se dirige vers la cuisine'], ['21:00', 'Quitte la maison, se tient sous l’arbre devant la maison'], ['23:00', 'Retourne à la maison']] },
        { title: 'Vendredi et samedi', rows: [['7:00', 'Quitte la maison, tient sous l’arbre entre l’entrée des égouts et le pont de la plage'], ['10:30', 'Retourne à la maison'], ['14:00', 'Quitte la maison, se tient sous un arbre au nord de la maison'], ['17:00', 'Va au Saloon du fruit étoilé'], ['23:50', 'Quitte le Saloon et rentre chez lui']] },
        { title: 'Dimanche', rows: [['6:00', 'Dans la maison'], ['10:10', 'Quitte la maison, se dirige vers l’autel à l’intérieur du Magasin général de Pierre'], ['14:00', 'Quitte la salle de l’autel, se dirige vers le comptoir de Pierre'], ['16:00', 'Pars du Magasin général de Pierre, rentre à la maison et se tient dans l’entrée'], ['19:00', 'Se dirige vers la cuisine'], ['21:00', 'Quitte la maison, se tient sous l’arbre devant la maison'], ['23:00', 'Retourne à la maison']] },
        { title: 'Horaires normaux', rows: [['7:00', 'Quitte la maison, se tient sous l’arbre entre l’entrée des égouts et le pont de la plage'], ['10:30', 'Retourne à la maison'], ['14:00', 'Quitte la maison, se tient sous un arbre au nord de la maison'], ['17:00', 'Rentre à la maison et se tient dans l’entrée'], ['19:00', 'Se dirige vers la cuisine'], ['21:00', 'Quitte la maison, se tient sous l’arbre devant la maison'], ['23:00', 'Rentre à la maison']] },
      ] },
    ],
  },
  'jodi': {
    intro: 'Le 11 du printemps, elle se rend avec Vincent à la clinique pour son bilan de santé annuel et se rend à son propre rendez-vous le 18 du printemps.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi', rows: [['9:00', 'À l’intérieur de sa maison, dans la cuisine.'], ['11:40', 'À l’intérieur de sa maison, dans le salon, assise sur le canapé bleu.'], ['14:00', 'Rencontre avec Caroline dans le nord près de sa maison.'], ['16:00', 'Retourne chez elle et se tient près de la cuisine.'], ['19:30', 'À l’intérieur de sa maison, dans le salon.'], ['21:00', 'Dans sa maison, dans la chambre de Vincent.']] },
        { title: 'Mardi', rows: [['9:00', 'À l’intérieur de sa maison, dans la cuisine.'], ['10:00', 'Quitte la maison en direction du Magasin général de Pierre.'], ['12:00', 'Arrive au Magasin général de Pierre, rencontre Marnie, Caroline, Emily et Robine pour faire de l’exercice.'], ['18:00', 'Pars de chez Pierre et rentre chez elle.']] },
        { title: 'Mercredi', rows: [['12:00', 'Shopping au Marché Joja'], ['18:40', 'Entre dans sa maison.']] },
        { title: 'Jeudi', rows: [['11:20', 'Quitte la cuisine et entre dans le salon, pour s’asseoir sur le canapé.']] },
        { title: 'Vendredi', rows: [['9:00', 'À l’intérieur de sa maison, dans la cuisine.'], ['12:50', 'Shopping au Marché Joja'], ['18:30', 'Entre dans sa maison.']] },
        { title: 'Samedi', rows: [['10:00', 'À l’intérieur de sa maison, dans la cuisine.'], ['13:00', 'À l’intérieur de sa maison. Si le Centre communautaire est réparé, elle sera sur le canapé en haut à gauche.'], ['16:30', 'Arrive chez elle.']] },
        { title: 'Dimanche', rows: [['11:00', 'Près de l’autel au Magasin général de Pierre.'], ['14:00', 'Quitte la boutique de Pierre pour rentrer chez lui.']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Lundi', rows: [['9:00', 'Dans la cuisine, à laver la vaisselle.'], ['9:40', 'Arrête de laver la vaisselle et se déplace dans la cuisine.'], ['10:40', 'Reprend la vaisselle.'], ['11:30', 'Va dans le salon pour s’asseoir sur le canapé bleu.'], ['13:30', 'Quitte sa maison, se dirigeant vers la place de la ville.'], ['14:00', 'Arrive à la place de la ville, se tient en bas à gauche près de sa maison avec Caroline.'], ['16:00', 'Quitte la place de la ville et rentre chez elle.'], ['16:20', 'Arrive chez elle.'], ['16:30', 'Debout dans la cuisine.'], ['19:00', 'Commence à laver la vaisselle.'], ['19:30', 'Va se tenir dans le salon, près du bureau qui a le bulletin de Vincent.'], ['21:00', 'Met Vincent au lit.'], ['22:00', 'Quitte la chambre de Vincent, se dirigeant vers sa chambre.'], ['22:20', 'Arrive dans sa chambre, va directement se coucher.']] },
        { title: 'Mardi', rows: [['9:00', 'Dans la cuisine, lave la vaisselle.'], ['9:40', 'Se déplace dans la cuisine.'], ['10:10', 'Quitte sa maison, se dirigeant vers le Magasin général de Pierre.'], ['11:00', 'Entre dans le Magasin général de Pierre.'], ['11:20', 'Va dans le coin arrière (salon?) de chez Pierre.'], ['11:30', 'Debout près de la cheminée à l’arrière de Pierre.'], ['13:00', 'Commence à faire de l’exercice avec Marnie, Caroline, Emily, et Robine.'], ['16:00', 'Se tient près de la cheminée avec Caroline, Marnie, et Robine. Le cours d’exercice vient de se terminer.'], ['18:00', 'Retourne dans la partie magasin général du bâtiment.'], ['18:20', 'Sort de chez Pierre pour rentré chez elle.'], ['19:10', 'Entre chez elle.'], ['19:20', 'Debout près de l’étagère avec la lampe dans l’entrée (partie inférieur gauche du salon).'], ['21:10', 'Met Vincent au lit.'], ['22:00', 'Quitte la chambre de Vincent, se dirige vers le lit.'], ['22:20', 'Entre dans sa chambre et s’endort.']] },
        { title: 'Mercredi, Vendredi', rows: [['9:00', 'Dans la cuisine.'], ['11:00', 'Quitte sa maison et se dirige vers le Marché Joja'], ['12:50', 'Arrive au Marché Joja'], ['15:00', 'Pars du Marché Joja et rentre à la maison.'], ['18:30', 'A la maison, devant le frigo.'], ['21:00', 'Met Vincent au lit.'], ['22:00', 'Se met au lit.']] },
        { title: 'Jeudi, Samedi', rows: [['9:00', 'Dans la cuisine.'], ['11:30', 'Se trouve dans le salon.'], ['13:30', 'Quitte la maison et se dirige vers la place de la ville.'], ['16:00', 'Rentre chez elle.'], ['16:30', 'Se tient dans la cuisine.'], ['19:30', 'Se tient dans le salon.'], ['21:00', 'Met Vincent au lit.'], ['22:00', 'Se met au lit.']] },
        { title: 'Dimanche', rows: [['11:00', 'A l’église (pièce avec l’autel chez Pierre ?).'], ['17:00', 'Rentre chez elle.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Mardi', rows: [['18:00', 'Quitte l’arrière-boutique de Pierre pour rentrer à sa maison.'], ['19:00', 'Arrive chez elle.'], ['21:00', 'Entre dans la chambre de Vincent.'], ['22:00', 'Quitte la chambre de Vincent.'], ['22:20', 'Arrive dans sa chambre.']] },
        { title: 'Mercredi', rows: [['19:00', 'Arrive à la maison.'], ['19:30', 'Arrive à la cuisine.']] },
        { title: 'Jeudi', rows: [['9:00', 'Dans la cuisine.'], ['11:30', 'Quitte la cuisine et se dirige vers le salon.'], ['13:30', 'Quitte la maison et se dirige vers la place de la ville.'], ['16:00', 'Quitte la place de la ville et rentre chez elle.'], ['19:30', 'Quitte la cuisine et se dirige vers le salon.'], ['21:00', 'Quitte le salon et entre dans la chambre de Vincent.'], ['22:00', 'Quitte la chambre de Vincent et se dirige vers sa chambre.']] },
        { title: 'Vendredi', rows: [['18:30', 'Arrive à la maison, entre dans la cuisine.']] },
        { title: 'Dimacnche', rows: [['9:00', 'À la maison dans la cuisine.'], ['10:00', 'Quitte la maison, marche vers Magasin général de Pierre'], ['11:00', 'Arrivée chez Pierre, marche dans la chapelle à l’arrière boutique.'], ['14:00', 'Quitte la chapelle, retourne dans le magasin.'], ['16:00', 'Quitte Magasin général de Pierre, rentre à la maison.'], ['17:00', 'À la maison sur le canapé.']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Lundi', rows: [['12:20', 'Dans le salon.'], ['14:00', 'Sur la place de la ville.']] },
        { title: 'Mardi', rows: [['11:00', 'Entre chez Pierre.'], ['18:20', 'Pars de chez Pierre et rentre chez elle.'], ['19:20', 'Arrives à la maison.'], ['21:00', 'Rentre dans la chambre de Vincent.'], ['22:20', 'Se met au lit.']] },
        { title: 'Mercredi', rows: [['12:00', 'Quitte la maison et se dirige vers le Marché Joja.'], ['17:00', 'Quitte le Marché Joja et rentre à la maison.'], ['19:00', 'Se tient dans la cuisine.']] },
        { title: 'Jeudi', rows: [['9:40', 'Se tient dans la cuisine.'], ['13:30', 'Quitte la maison pour la place de la ville.'], ['16:00', 'Quitte la place de la ville pour la maison.'], ['16:10', 'Arrive à la maison.']] },
        { title: 'Vendredi', rows: [['12:00', 'Quitte la maison et se dirige vers le Marché Joja.'], ['16:00', 'Quitte le Marché Joja et rentre à la maison.'], ['19:10', 'Se tient dans la cuisine.']] },
        { title: 'Samedi', rows: [['13:30', 'Quitte la maison et se dirige vers la place de la ville ou le Centre communautaire (si restauré).'], ['17:10', 'Pars du centre ville / Centre communautaire.']] },
        { title: 'Dimanche', rows: [['11:00', 'Quitte la maison et se dirige vers l’église (chez Pierre).'], ['16:00', 'Pars de chez Pierre et se dirige vers la maison.'], ['17:00', 'Arrive à la maison.']] },
      ] },
      { label: 'Exceptions', blocks: [
        { title: 'Mercredi, Vendredi (Centre communautaire restauré)', rows: [['9:00', 'À l’intérieur de sa maison, dans la cuisine.'], ['12:00', 'Arrive au Magasin général de Pierre.'], ['18:30', 'À l’intérieur de sa maison.']] },
        { title: 'Samedi (Centre communautaire restauré)', rows: [['8:00', 'Dans la cuisine.'], ['11:00', 'Quitte la maison, se rend au Centre communautaire, se tient à l’intérieur de la pièce principale.'], ['17:00', 'Retourne à la maison, se tient dans le salon.'], ['21:00', 'Va au lit.']] },
      ] },
    ],
  },
  'jas': {
    intro: 'Le 18 de l’hiver, Marnie l’emmène faire son bilan de santé annuel à la Clinique d’Harvey.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi', rows: [['12:00', 'Joue avec sa corde à sauter au bord du lac près de la Tour du sorcier, à la maison s’il pleut.']] },
        { title: 'Mardi', rows: [['11:00', 'Arrive au Musée pour son cours avec Penny et Vincent.'], ['14:00', 'Part du cours et se dirige en bas du pont vers le musée.'], ['16:30', 'Se tient devant le 1 allée des Saules.'], ['17:40', 'Rentre à la maison avec Penny.']] },
        { title: 'Jeudi', rows: [['11:00', 'Quitte sa chambre.'], ['12:00', 'Sort du Ranch de Marnie.'], ['13:00', 'Joue au bord du lac, sous le cerisier.'], ['15:00', 'Rentre au Ranch de Marnie.']] },
        { title: 'Vendredi', rows: [['9:00', 'Quitte la maison et se dirige vers le Musée.'], ['15:30', 'En dehors du Musée.']] },
        { title: 'Samedi', rows: [['11:00', 'Quitte la pièce et se dirige vers l’arbre à droite du 2 allée des Saules.']] },
        { title: 'Dimanche', rows: [['13:00', 'Joue avec sa corde à sauter au bord du lac de la Forêt Sève-Cendreuse.'], ['17:40', 'Lit un livre à l’intérieur du Ranch de Marnie.']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Lundi', rows: [['11:00', 'Elle quitte sa chambre.'], ['17:40', 'Arrive à la maison.']] },
        { title: 'Mardi', rows: [['9:00', 'Quitte sa chambre pour aller au Musée.'], ['14:00', 'Quitte la classe au Musée avec Penny et Vincent.'], ['14:30', 'Arrive à la rivière au sud-ouest du Musée.'], ['17:20', 'Se tient près de la maison de Vincent.'], ['17:40', 'Marche jusqu’à sa maison avec Penny.'], ['18:30', 'Rentre chez elle.']] },
        { title: 'Mercredi', rows: [['9:00', 'Quitte sa chambre pour aller au Musée.'], ['14:00', 'Fin du cours à la bibliothèque au Musée avec Penny et Vincent.'], ['14:30', 'Arrive à la rivière au sud-ouest du Musée.'], ['17:20', 'Se tient près de la maison de Vincent.'], ['17:40', 'Marche jusqu’à sa maison avec Penny.'], ['18:30', 'Rentre chez elle.']] },
        { title: 'Jeudi', rows: [['9:00', 'Dans sa chambre.'], ['11:00', 'Elle quitte sa chambre pour se tenir à l’extérieur près de l’enclos des vaches.'], ['13:00', 'Quitte le ranch pour aller à la plage avec Vincent et Sam.'], ['14:50', 'Arrive à La plage.'], ['16:00', 'Quitte la plage pour rentrer à la maison.'], ['17:40', 'Arrive à la maison. Se tient dans l’entrée à l’intérieur.'], ['19:00', 'Va dans sa chambre.'], ['21:00', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Quitte sa chambre pour aller au Musée.'], ['14:00', 'Part du Musée'], ['14:40', 'Arrive à la rivière au sud-ouest du Musée.'], ['17:20', 'Se tient près de la maison de Vincent.'], ['17:40', 'Rentre jusqu’à chez elle avec Penny.'], ['18:30', 'Arrive à la maison.']] },
        { title: 'Samedi', rows: [['17:00', 'Quitte le parc avec Penny et Vincent.'], ['18:20', 'Arrive et se tient à l’est du 2 allée des Saules avec Penny et Vincent.'], ['20:00', 'Rentre à la maison.'], ['20:50', 'Arrive à la maison.']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa chambre.'], ['13:20', 'Quitte la maison pour aller à La plage.'], ['15:00', 'Arrive à la plage.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Lundi', rows: [['12:00', 'Joue à la corde à sauter sous le grand arbre dans la Forêt Sève-Cendreuse.'], ['16:00', 'Assise à la maison et lit un livre.']] },
        { title: 'Mardi', rows: [['13:00', 'Assise à la bibliothèque avec Vincent.']] },
        { title: 'Mercredi', rows: [['14:00', 'Quitte le cours à la bibliothèque avec Penny et Vincent.'], ['18:30', 'Arrive à la maison avec Penny.']] },
        { title: 'Jeudi', rows: [['16:00', 'Assise à la maison et lit un livre.']] },
        { title: 'Vendredi', rows: [['13:00', 'Lecture au Musée avec Vincent et Penny.'], ['14:00', 'Va à l’extérieur du Musée, près de la rivière, au pont.'], ['16:20', 'Marche jusqu’au 2 allée des Saules, avec Vincent et Penny.'], ['17:50', 'Marche jusqu’au Ranch de Marnie avec Penny.'], ['18:30', 'Arrive à la maison.']] },
        { title: 'Samedi', rows: [['9:00', 'Dans sa chambre.'], ['11:00', 'Part du Ranch de Marnie pour aller à Pélican Ville.'], ['12:00', 'Promenade à l’aire de jeux près du Centre communautaire avec Vincent et Penny.'], ['13:00', 'Est à l’aire de jeux près du Centre communautaire avec Vincent et Penny.'], ['17:00', 'Quitte l’aire de jeux et se dirige vers la maison d’ Emily avec Vincent et Penny.'], ['18:20', 'Arrive devant la maison de Emily.'], ['20:00', 'Se dirige vers la maison, tout comme Penny et Vincent.'], ['20:50', 'Arrive à la maison.']] },
        { title: 'Dimanche', rows: [['12:00', 'Arrive à Chariot de voyage pour jouer à la corde à sauter.'], ['15:00', 'Départ pour le Ranch de Marnie.'], ['16:00', 'Arrive au Ranch et lit à l’entrée.'], ['19:00', 'Va dans la chambre.'], ['21:00', 'Va au lit.']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Horaire', rows: [['11:40', 'Marche sur le chemin devant la maison de Marnie (sur le chemin avec l’arbre)'], ['15:30', 'Arrive à la maison, commence à lire au bureau de Marnie.'], ['0:00', 'Près d’un arbre au nord du lac dans la Forêt Sève-Cendreuse.']] },
        { title: 'Mardi', rows: [['9:00', 'Part de la maison pour aller au Musée.'], ['11:00', 'Arrive au Musée.'], ['14:10', 'Quitte le Musée et se dirige vers la rivière au sud du stand de glace.'], ['14:30', 'Se tient près de la rivière au sud du stand de glace avec Penny et Vincent.'], ['16:20', 'Quitte la rivière avec Penny et Vincent.'], ['17:20', 'Se tient devant des maisons sur l’allée des Saules avec Penny et Vincent.'], ['17:50', 'Marche vers la maison avec Penny.'], ['18:30', 'Rentre à la maison.']] },
        { title: 'Mercredi', rows: [['14:10', 'Quitte le Musée et se dirige vers la rivière au sud du stand de glace.'], ['14:30', 'Se tient près de la rivière au sud du stand de glace avec Penny et Vincent.'], ['16:20', 'Quitte la rivière avec Penny et Vincent.'], ['17:20', 'Se tient devant des maisons à l’allée des Saules avec Penny et Vincent.'], ['17:50', 'Marche en direction de la maison avec Penny.'], ['18:30', 'Rentre à la maison.']] },
        { title: 'Horaire', rows: [['14:10', 'Quitte le Musée et se dirige vers la rivière au sud du stand de crème glacée.'], ['14:30', 'Se tient près de la rivière au sud du stand de glace avec Penny et Vincent.'], ['16:20', 'Part de la rivière avec Penny et Vincent.'], ['17:20', 'Se tient devant des maisons de l’allée des Saules avec Penny et Vincent.'], ['17:50', 'Rentre à la maison avec Penny.'], ['18:30', 'Entre à la maison.']] },
        { title: 'Vendredi', rows: [['9:40', 'En direction de la ville vers Musée.'], ['14:10', 'Quitte le Musée et se dirige vers la rivière au sud du stand de glaces.'], ['14:30', 'Se tient près de la rivière au sud du stand de glace avec Penny et Vincent.'], ['16:20', 'Part de la rivière avec Penny et Vincent.'], ['17:20', 'Se tient devant des maisons de l’allée des Saules avec Penny et Vincent.'], ['17:50', 'Rentre à la maison avec Penny.'], ['18:30', 'Entre à la maison.']] },
        { title: 'Samedi', rows: [['11:00', 'Debout sous un arbre à droite du 1 allée des Saules avec Vincent.'], ['12:00', 'Part et se dirige vers l’aire de jeux avec Vincent.'], ['13:10', 'Arrive à l’aire de jeux et fait de la corde à sauter.'], ['17:00', 'Pars de l’aire de jeux avec Vincent et rentre à la maison.']] },
        { title: 'Dimanche', rows: [['11:00', 'Quitte sa chambre pour aller faire de la corde à sauter près du Chariot de voyage.'], ['15:00', 'Part de la forêt.'], ['16:00', 'Lit un livre à la maison.']] },
      ] },
    ],
  },
  'marnie': {
    intro: 'Ci-dessous, le calendrier de Marnie. S’il pleut, le programme Jour de pluie remplace tous les programmes. Marnie aura toujours son contrôle annuel le jour de son anniversaire.',
    groups: [
      { label: '', blocks: [
        { title: '18 Automne', rows: [['6:00', 'A la maison, dans sa chambre.'], ['10:30', 'Quitte sa maison et se dirige vers la Clinique d’Harvey.'], ['12:00', 'Arrive à la clinique, se tient dans la salle d’attente.'], ['13:30', 'Marche dans la salle d’examen de la clinique.'], ['16:00', 'Quitte la Clinique d’Harvey et retourne à sa maison.'], ['17:30', 'Arrive à la maison et se tient dans la cuisine.'], ['21:00', 'Va dans sa chambre et s’endort.']] },
        { title: '18 Hiver', rows: [['9:00', 'A la maison, dans sa chambre.'], ['11:00', 'Quitte la maison et emmène Jas à la Clinique d’Harvey.'], ['12:00', 'Se tient dans la salle d’attente de la clinique.'], ['13:40', 'Marche dans la salle d’examen de la clinique.'], ['16:00', 'Quitte la Clinique d’Harvey et retourne à la maison.'], ['18:00', 'Arrive à la maison et se tient dans la cuisine.'], ['21:00', 'Va dans sa chambre et se couche.']] },
        { title: 'Jour de pluie / Jeudi', rows: [['6:00', 'A la maison, dans sa chambre.'], ['9:00', 'Se tient derrière le comptoir de sa boutique.'], ['16:00', 'Ferme sa boutique et se dirige vers la cuisine.'], ['18:00', 'Quitte la cuisine et se dirige vers sa chambre. Se tient devant sa commode.'], ['21:00', 'Va au lit.']] },
        { title: 'Lundi', rows: [['6:00', 'A la maison dans sa chambre.'], ['8:10', 'Quitte sa maison et se dirige vers le Magasin général de Pierre.'], ['12:00', 'Quitte le magasin général et retourne chez elle.'], ['13:30', 'Arrive à la maison et se tient dans la cuisine.'], ['21:00', 'Va dans sa chambre et se couche.']] },
        { title: 'Mardi', rows: [['6:00', 'A la maison, dans sa chambre.'], ['10:00', 'Quitte sa maison et se dirige vers le Magasin général de Pierre.'], ['12:00', 'Arrive au magasin général pour faire de l’exercice avec Caroline, Jodi, Emily et Robine.'], ['16:00', 'Discute avec les autres femmes après le cours d’exercices.'], ['18:10', 'Quitte le magasin général et retourne chez elle.'], ['20:00', 'Arrive à la maison et se tient dans la cuisine.'], ['21:00', 'Va dans sa chambre et se couche.']] },
        { title: 'Mercredi / Vendredi / Samedi / Dimanche', rows: [['6:00', 'A la maison, dans sa chambre.'], ['9:00', 'Se tient derrière le comptoir de sa boutique.'], ['16:00', 'Ferme sa boutique et se dirige vers sa chambre.'], ['17:00', 'Quitte sa maison et se dirige vers Saloon du fruit étoilé.'], ['23:00', 'Quitte le saloon et rentre chez elle pour se coucher.']] },
      ] },
    ],
  },
  'krobus': {
    intro: 'Krobus est toujours trouvable dans les Égouts à partir du moment où Le joueur possède la Clé rouillée.',
    groups: [
    ],
  },
  'linus': {
    intro: 'Ci-dessous sont détaillés les horaires de Linus, priorisés de haut en bas. Par exemple, s’il pleut, les horaires de pluie prennent la priorité sur ceux d’en dessous.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Pluvieux', rows: [['6:00', 'Dans sa tente'], ['9:30', 'Quitte sa tente, se tient derrière le buisson à gauche de son camp'], ['10:10', 'Retourne dans sa tente'], ['23:30', 'Se couche']] },
        { title: 'Horaires réguliers', rows: [['6:00', 'Dans sa tente'], ['6:30', 'Quitte sa tente, se tient derrière le buisson à gauche de son camp'], ['7:00', 'Se rend à gauche de son feu de camp'], ['9:30', 'Se tient sur la rive gauche du lac']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Pluvieux', rows: [['6:00', 'Dans sa tente'], ['9:30', 'Quitte sa tente, se tient derrière le buisson à gauche de son camp'], ['10:10', 'Retourne dans sa tente'], ['3:00', 'Quitte sa tente, se tient sous l’arbre à gauche de son camp'], ['23:30', 'Se couche']] },
        { title: 'Horaires réguliers', rows: [['6:00', 'Dans sa tente'], ['6:30', 'Se rend sur la falaise à droite de sa tente, observe le lac'], ['9:40', 'Marche au Sud du lac'], ['20:20', 'Rentre chez lui pour la nuit']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Pluvieux', rows: [['6:00', 'Dans sa tente'], ['9:30', 'Quitte sa tente, se tient derrière le buisson à gauche de son camp'], ['10:10', 'Retourne dans sa tente'], ['23:30', 'Se couche']] },
        { title: 'Horaires réguliers', rows: [['6:00', 'Dans sa tente'], ['7:00', 'Quitte sa tente, se tient derrière le buisson à gauche de son camp'], ['7:40', 'Se rend à gauche de son feu de camp'], ['9:00', 'Se rend au Spa, se tient à droite du bâtiment']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: '15 d’Hiver', rows: [['6:00', 'Dans sa tente'], ['11:00', 'Quitte sa tente, se tient à gauche de son feu de camp'], ['23:30', 'Rentre chez lui pour la nuit']] },
        { title: 'Horaires réguliers', rows: [['6:00', 'Dans sa tente'], ['11:00', 'Quitte sa tente, se tient à gauche de son feu de camp']] },
      ] },
    ],
  },
  'pam': {
    intro: 'Après avoir débloqué la Station balnéaire sur l’Île Gingembre, Pam peut s’y rendre de manière aléatoire pour la journée. En quittant l’île à 18h00, Pam ira se coucher directement. Elle ne va jamais sur l’île le 15 Automne, les jours de Festival, ou le jour de son rendez-vous médical. Les emplois du temps ci-dessous sont classés par ordre de priorité, du plus important au moins important. Par exemple, si Pam est choisie pour tenir une boutique au Festival du désert, cet emploi du temps prendra le pas sur tout le reste.',
    groups: [
      { label: '', blocks: [
        { title: '16 Printemps (ligne de bus restaurée)', rows: [['10:50', 'Se tient devant une boutique d’un des villageois.'], ['0:40', 'Rentre en bus à la Vallée.']] },
        { title: 'Festival du désert (en tant que vendeuse)', rows: [['11:30', 'Arrive à sa boutique.'], ['0:00', 'Quitte sa boutique et rentre en bus à la Vallée.']] },
        { title: '15 et 17 Printemps (ligne de bus restaurée)', rows: [['8:50', 'Arrive à l’Arrêt de bus.'], ['0:50', 'Rentre chez elle.']] },
        { title: '25 Printemps', rows: [['11:30', 'Quitte sa caravane et se dirige vers la clinique pour sa visite médicale annuelle.'], ['13:30', 'Poursuit sa visite médicale à la clinique.'], ['16:00', 'Quitte la clinique et se dirige vers le Saloon du fruit étoilé.'], ['0:00', 'Quitte le saloon et rentre chez elle pour la nuit.']] },
        { title: 'Horaire standard (ligne de bus non restaurée)', rows: [['12:00', 'Quitte sa caravane et se dirige vers le Marché Joja.'], ['16:00', 'Quitte le marché Joja et se dirige vers le Saloon du fruit étoilé.'], ['0:00', 'Quitte le saloon et rentre chez elle pour la nuit.']] },
        { title: 'Horaire standard (ligne de bus restaurée)', rows: [['8:30', 'Quitte sa caravane et se dirige vers l’Arrêt de bus.'], ['10:00', 'Arrive à l’arrêt de bus pour l’après-midi.'], ['17:00', 'Quitte l’arrêt de bus et se dirige vers le Saloon du fruit étoilé.'], ['0:00', 'Quitte le saloon et rentre chez elle pour la nuit.']] },
      ] },
    ],
  },
  'leo': {
    intro: 'Léo vit sur l’Île Gingembre et ne la quittera pas avant que le/la joueur/euse n’arrive à 6 coeurs d’amitié avec lui.',
    groups: [
      { label: '', blocks: [
        { title: 'Pluie', rows: [['9:00', 'A l’intérieur de sa hutte.'], ['11:00', 'Reste dehors, à l’entrée de sa hutte.'], ['14:00', 'Retourne à l’intérieur de sa hutte.'], ['21:00', 'Va se coucher.']] },
        { title: 'Mardi', rows: [['9:00', 'Dans sa hutte'], ['10:30', 'Se rend sur le ponton du sud de l’Île, reste à côté de l’entrée au sud-est de l’Île.'], ['13:30', 'Se rend dans la jungle à l’extérieur de sa hutte, reste à côté du buisson dans l’angle au sud-ouest.'], ['17:00', 'Se rend au nord de l’Île, reste à la droite du Perroquet Vendeur.'], ['20:00', 'Retourne à sa hutte pour se coucher.']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans sa hutte'], ['9:30', 'Se rend au Temple Banane, par le passage caché à l’est de la jungle'], ['14:00', 'Reste dehors à l’entrée de sa hutte'], ['17:00', 'Entre dans sa hutte'], ['21:00', 'Va se coucher']] },
        { title: 'Horaire régulier', rows: [['9:00', 'Dans sa hutte'], ['10:30', 'Reste dehors à l’entrée de sa hutte'], ['12:00', 'Se rend sur le ponton du sud de l’Île, reste dans l’angle au nord-ouest, à côté du perchoir pour perroquet'], ['15:00', 'Se rend dans le nord de l’Île, reste au nord-ouest de la carte, à l’ouest de l’entrée du volcan'], ['20:00', 'Retourne chez lui et va se coucher']] },
      ] },
      { label: 'Printemps', blocks: [
        { title: 'Lundi', rows: [['6:00', 'Dans sa hutte sur l’Île Gingembre'], ['9:30', 'A côté du perchoir pour perroquet au Sud de l’Île.'], ['14:00', 'Reste dehors à côté de sa hutte'], ['17:00', 'Entre dans sa hutte'], ['21:00', 'Va se coucher']] },
        { title: 'Mardi et Mercredi', rows: [['6:00', 'Dans sa maison dans l’arbre'], ['9:00', 'A la bibliothèque du musée'], ['14:00', 'Au sud du musée'], ['16:20', 'Reste à droite de sa maison dans l’arbre'], ['20:00', 'Entre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Jeudi et Vendredi', rows: [['6:30', 'Dans sa maison dans l’arbre'], ['7:00', 'Se tient à droite de sa maison dans l’arbre'], ['9:30', 'Se tient à l’ouest du lac de montagne'], ['14:00', 'Se tient à droite de sa maison dans l’arbre'], ['19:00', 'Entre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Samedi', rows: [['9:40', 'Se tient à côté de la maison de Haley et Emily'], ['12:00', 'Joue sur le terrain de jeu'], ['17:00', 'Se tient à droite de sa maison dans l’arbre'], ['19:00', 'Entre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Dimanche', rows: [['6:10', 'Dans sa hutte sur l’Île Gingembre'], ['10:30', 'Au sud de l’île, près de l’entrée du sud-est de l’île'], ['13:30', 'Devant de sa hutte'], ['17:00', 'À droite du perroquet marchand'], ['20:00', 'Va se coucher dans sa hutte']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Lundi', rows: [['6:00', 'Dans sa hutte sur l’Île Gingembre'], ['9:30', 'À côté du perchoir du perroquet au sud de l’île'], ['14:00', 'Devant de sa hutte'], ['17:00', 'Entre dans sa hutte'], ['21:00', 'Va se coucher']] },
        { title: 'Mardi et Mercredi', rows: [['6:00', 'Dans sa maison dans l’arbre'], ['9:00', 'Dans la bibliothèque du musée'], ['14:00', 'Au sud du musée'], ['16:20', 'Se tient à droite de sa maison dans l’arbre'], ['20:00', 'Entre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Jeudi et Vendredi', rows: [['6:30', 'Se tient devant sa maison dans l’arbre'], ['9:40', 'Se tient au bord ouest du lac de montagne'], ['13:00', 'Se balade autour de l’arbre au sud-ouest du lac de montagne'], ['16:00', 'Se tient à droite de sa maison dans l’arbre'], ['20:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Samedi', rows: [['9:40', 'À côté de la maison d’Emily et Haley'], ['12:00', 'Joue sur le terrain de jeux'], ['17:00', 'Se tient à droite de sa maison dans l’arbre'], ['19:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Dimanche', rows: [['6:10', 'Dans sa hutte sur l’île Gingembre'], ['10:30', 'Au sud de l’île, près de l’entrée du sud-est de l’île'], ['13:30', 'Devant sa hutte'], ['17:00', 'À droite du perroquet marchand'], ['20:00', 'Va se coucher dans sa hutte']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Lundi', rows: [['6:00', 'Dans sa hutte sur l’Île Gingembre'], ['9:30', 'À côté du perchoir du perroquet au sud de l’île'], ['14:00', 'Reste devant sa hutte'], ['17:00', 'Devant de sa hutte'], ['21:00', 'Va se coucher']] },
        { title: 'Mardi et Mercredi', rows: [['6:00', 'Dans sa maison dans l’arbre'], ['9:00', 'À la bibliothèque du musée'], ['14:00', 'Au sud du musée'], ['16:20', 'Reste à droite de sa maison dans l’arbre'], ['20:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Jeudi et Vendredi', rows: [['7:00', 'Dans sa maison dans l’arbre'], ['7:40', 'Se tient à droite de sa maison dans l’arbre'], ['9:00', 'Se tient au sud du centre communautaire'], ['14:00', 'Se tient à l’ouest du lac de montagne'], ['20:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Samedi', rows: [['9:40', 'Se tient à côté de la maison de Haley et Emily'], ['12:00', 'Joue sur le terrain de jeu'], ['17:00', 'Se tient à droite de sa maison dans l’arbre'], ['19:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Dimanche', rows: [['6:10', 'Dans sa hutte sur l’Île Gingembre'], ['10:30', 'Au sud de l’île, près de l’entrée du sud-est de l’île'], ['13:30', 'Devant de sa hutte'], ['17:00', 'À droite du perroquet marchand'], ['20:00', 'Va se coucher dans sa hutte']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Hiver 15', rows: [['11:00', 'Marche jusqu’à la tente de Linus et se tient devant l’entrée'], ['16:00', 'Marche jusqu’au Marché nocturne'], ['23:30', 'Rentre dormir']] },
        { title: 'Lundi', rows: [['6:00', 'Dans sa hutte sur l’Île Gingembre'], ['9:30', 'À côté du perchoir du perroquet au sud de l’île'], ['14:00', 'Se tient devant sa hutte'], ['17:00', 'Rentre dans sa hutte'], ['21:00', 'Va se coucher']] },
        { title: 'Mardi et Mercredi', rows: [['6:00', 'Dans sa maison dans l’arbre'], ['9:00', 'Dans la bibliothèque du musée'], ['14:00', 'Au sud du musée'], ['16:20', 'Se tient à droite de sa maison dans l’arbre'], ['20:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Jeudi et Vendredi', rows: [['11:00', 'Se tient à droite de sa maison dans l’arbre'], ['14:00', 'Lis des livres dans la bibliothèque du musée'], ['20:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Samedi', rows: [['9:40', 'À côté de la maison d’Emily et Haley'], ['12:00', 'Joue sur le terrain de jeux'], ['17:00', 'Se tient à droite de sa maison dans l’arbre'], ['19:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: 'Dimanche', rows: [['6:10', 'Dans sa hutte sur l’île Gingembre'], ['10:30', 'Au sud de l’île, près de l’entrée du sud-est de l’île'], ['13:30', 'Devant de sa hutte'], ['17:00', 'À droite du perroquet marchand'], ['20:00', 'Va se coucher dans sa hutte']] },
      ] },
      { label: 'Exceptions', blocks: [
        { title: 'Pluie', rows: [['7:00', 'Dans sa maison dans l’arbre'], ['10:00', 'Visite la tente de Linus'], ['15:00', 'Se tient à droite de sa maison dans l’arbre'], ['19:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
        { title: '9e & 25e jour de n’importe quelle saison (si vous avez moins de 6 coeurs avec Sam)', rows: [['6:30', 'Dans sa maison dans l’arbre'], ['7:00', 'Se tient à droite de sa maison dans l’arbre'], ['9:30', 'Se tient à l’ouest du lac de montagne'], ['14:00', 'Se tient à droite de sa maison dans l’arbre'], ['19:00', 'Rentre dans sa maison dans l’arbre'], ['22:00', 'Va se coucher']] },
      ] },
    ],
  },
  'sam': {
    intro: 'On peut souvent voir Sam en train de jouer de sa guitare chez lui. Il est également souvent vu à l’extérieur de chez lui en train de jouer à un jeu vidéo sur son portable ou de tenter des tours de skateboard. Les week-ends, on peut le trouver en train de jouer aux bornes d’arcades du Saloon du fruit étoilé. Il travaille à mi-temps les Lundi et Mercredi au Marché Joja (si ce sont ses heures de travail), ou au musée dans la galerie des Artefacts et Minéraux (si le Centre communautaire a été restauré). Il fréquente le Saloon du fruit étoilé durant le printemps, va à la plage en été, et visite les bois à l’ouest de la ville en automne. Quand il pleut il reste la journée entière à la maison, ou visite le Saloon du fruit étoilé pour quelques heures. Le jour 11 de l’automne, il a rendez-vous à la Clinique d’Harvey.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi', rows: [['10:00', 'Se lève et reste au milieu de sa chambre.'], ['11:00', 'Quitte sa chambre et marche jusqu’à Marché Joja.'], ['12:50', 'Arrive à Marché Joja et commence à travailler.'], ['16:00', 'Finit le travail à Marché Joja et rentre à la maison.'], ['18:00', 'Arrive dans sa chambre et reste debout devant son étagère.'], ['21:30', 'Va au lit.']] },
        { title: 'Mardi', rows: [['10:00', 'Se lève et reste au milieu de sa chambre.'], ['10:40', 'Joue de la guitare dans sa chambre.'], ['14:00', 'Quitte la maison et attend près du Manoir du maire et de la rivière.'], ['18:30', 'Rentre à la maison.']] },
        { title: 'Mercredi', rows: [['10:00', 'Se lève et reste au milieu de sa chambre.'], ['11:00', 'Quitte sa chambre et marche jusqu’au Marché Joja.'], ['12:50', 'Arrive au Marché Joja et commence à travailler.'], ['16:00', 'Fini le travail au Marché Joja et rentre à la maison.'], ['18:00', 'Arrive à sa chambre et reste debout devant son étagère.'], ['21:30', 'Va au lit.']] },
        { title: 'Jeudi', rows: [['10:00', 'Se lève et reste devant son armoire.'], ['10:40', 'Joue de la guitare dans sa chambre.'], ['13:40', 'Quitte sa chambre et marche jusqu’au sud-est de la maison de Lewis.'], ['15:00', 'Attend face au buisson au sud est de la maison de Lewis.'], ['18:30', 'Commence à rentrer à la maison.'], ['19:50', 'Arrive à sa chambre et attend face à son bureau.'], ['21:00', 'Va au lit']] },
        { title: 'Vendredi', rows: [['10:00', 'Se lève et joue de la guitare dans sa chambre.'], ['11:00', 'Quitte sa chambre et fait du skateboard devant sa maison.'], ['15:00', 'Va à Saloon du fruit étoilé.'], ['16:00', 'Arrive au Saloon du fruit étoilé et joue au billard à la salle d’arcade.'], ['21:20', 'Quitte Saloon du fruit étoilé et rentre chez lui.'], ['22:20', 'Arrive à la maison.']] },
        { title: 'Calendrier régulier', rows: [['10:00', 'Se lève et bouge dans sa chambre.'], ['10:40', 'Joue de la guitare dans sa chambre.'], ['13:40', 'Quitte sa chambre, marche dans la ville et attends près de la maison de Lewiset la rivière.'], ['18:30', 'Retourne à la maison depuis la ville.'], ['21:00', 'Vas dans sa chambre se coucher.']] },
        { title: 'Jour de pluie (Option 1)', rows: [['9:00', 'Se lève et attend devant son armoire.'], ['11:00', 'Quitte sa chambre et prend le pont à coté du Musée.'], ['12:00', 'Arrive au pont à coté du Musée.'], ['16:00', 'Quitte le pont à côté du Musée et marche jusqu’à l’arbre devant la maison d’Emily et Haley.'], ['16:40', 'Arrive à l’arbre devant la maison d’Emily et Haley et joue aux jeux vidéos.'], ['19:00', 'Rentre à la maison.'], ['19:30', 'Arrive à sa chambre et attend devant son étagère.'], ['21:30', 'Va au lit.']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Calendrier régulier', rows: [['10:00', 'Se lève et marche dans sa chambre.'], ['11:00', 'joue de la guitare dans sa chambre.'], ['13:40', 'Quitte sa chambre et va à la plage, au feu de camp avec son frère Vincent.'], ['19:00', 'Retourne à la maison depuis la plage.'], ['21:00', 'Va dans sa chambre pour se coucher.']] },
        { title: 'Lundi, Mercredi', rows: [['10:00', 'Se lève et attend au milieu de sa chambre.'], ['11:00', 'Quitte sa chambre et va à Marché Joja.'], ['12:50', 'Arrive à Marché Joja et travaille.'], ['16:00', 'Fini de travailler à Marché Joja et rentre à la maison.'], ['18:00', 'Arrive à sa chambre et attend devant son étagère.'], ['21:30', 'Va au lit.']] },
        { title: 'Anniversaire (Marché Joja ouvert ou premier jour de fermeture de Joja, et pas de pluie)', rows: [['10:00', 'Se lève et marche dans sa chambre.'], ['11:00', 'Quitte sa chambre et se dirige vers Marché Joja avec sa mère Jodi.'], ['12:50', 'Arrive à Marché Joja.'], ['16:00', 'Quitte Marché Joja et rentre à la maison.'], ['17:50', 'Arrive à la maison, marche dans sa chambre.'], ['21:00', 'Va au lit.']] },
        { title: 'Anniversaire (Marché Joja ouvert, et Pluie), Jour de pluie', rows: [['10:00', 'Se lève et marche dans sa chambre.'], ['11:00', 'Joue de la guitare dans sa chambre.'], ['15:00', 'Sort de la chambre et attends dans la cuisine en jouant aux jeux vidéos.'], ['17:00', 'Retourne et marche dans sa chambre.'], ['20:00', 'Va au lit.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Calendrier régulier', rows: [['10:00', 'Se lève et marche dans sa chambre.'], ['10:40', 'Joue de la guitare dans sa chambre.'], ['13:20', 'Quitte sa chambre et va à la forêt à sud-ouest de la Maison de Leah.'], ['19:00', 'Retourne à la maison depuis la forêt.'], ['21:00', 'Va dans sa chambre se coucher.']] },
        { title: 'Jour 11 Automne', rows: [['10:00', 'Se lève et marche dans sa chambre. "I gotta go visit Uncle Doctor today... Great."'], ['11:30', 'Se rend à la clinique pour son contrôle annuel, joue aux jeux vidéos dans la salle d’attente.'], ['13:30', 'A son examen médicale à la clinique. "I’m a healthy boy, doc. Can I go now? This is boring."'], ['16:00', 'Quitte la clinique et marche dans la ville. "I just got out of the doctor’s office. Completely healthy and vigorous, just as I expected."'], ['21:00', 'Retourne dans sa chambre se coucher.']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Calendrier régulier', rows: [['10:00', 'Se lève et marche dans sa chambre.'], ['10:40', 'Joue de la guitare dans sa chambre.'], ['13:20', 'Quitte sa chambre pour aller au Saloon du fruit étoilé.'], ['19:00', 'Retourne à la maison depuis Saloon du fruit étoilé.'], ['21:00', 'Va dans sa chambre se coucher.']] },
      ] },
      { label: 'Exceptions', blocks: [
        { title: 'Jour 9 & Jour 23 (Si moins de 6 coeurs avec Penny)', rows: [['9:00', 'Se lève et marche dans sa chambre.'], ['11:00', 'Quitte sa chambre et marche dans la ville.'], ['16:00', 'Continue de marcher dans la ville, joue aux jeux vidéos.'], ['19:00', 'Retourne à la maison depuis la ville.'], ['21:30', 'Va dans sa chambre se coucher.']] },
        { title: 'Jour de pluie - choix aléatoire #1', rows: [['10:00', 'Se lève et attends devant l’armoire de sa chambre.'], ['11:00', 'Joue de la guitare dans sa chambre.'], ['15:00', 'Joue aux jeux vidéos dans la cuisine.'], ['17:00', 'Retourne dans sa chambreet attend devant son armoire.'], ['18:30', 'A son bureau dans sa chambre.'], ['20:00', 'Va se coucher.']] },
        { title: 'Jour de pluie - choix aléatoire #2', rows: [['10:00', 'Se lève et marche dans sa chambre.'], ['11:00', 'Marche dans sa maison.'], ['14:00', 'Quitte sa maison et va à Saloon du fruit étoilé. "Nothing like an ice cold Joja Cola on a sopping wet day, huh? Just kidding. Hehehe."'], ['19:40', 'Quitte Saloon du fruit étoilé et rentre à la maison se coucher.']] },
        { title: 'Samedi', rows: [['8:00', 'Se lève et va dehors pour attendre près de la rivière devant la maison de Haley et Emily.'], ['11:00', 'Va au buisson à coté de le maison et joue aux jeux vidéos.'], ['12:30', 'Quitte la ville, va dans sa chambre avec Sebastian pour jouer de la guitare.'], ['15:00', 'Traine dans sa chambre avec Sebastian.'], ['18:00', 'Quitte la maison pour aller à la rivière devant la maison de Sebastian.'], ['19:40', 'Retourne dans sa chambre se coucher.']] },
        { title: 'Lundi et Mercredi, Centre communautaire restauré', rows: [['10:00', 'Se lève et attends dans sa chambre.'], ['11:00', 'Quitte sa chambre et va au Musée.'], ['16:00', 'Quitte le Musée, et rentre à la maison.'], ['18:00', 'Arrive dans sa chambre et attends devant son étagère.'], ['21:30', 'Va se coucher.']] },
        { title: 'Vendredi', rows: [['10:00', 'Se lève et joue de la guitare dans sa chambre.'], ['11:00', 'Quitte sa chambre et marche dans la ville pour faire du skateboard.'], ['15:00', 'Va à Saloon du fruit étoilé pour jouer au billard dans la salle d’arcade.'], ['21:20', 'Quitte Saloon du fruit étoilé et rentre à la maison se coucher.']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['6:00', 'A la maison.'], ['8:00', 'Quitte la maison et se dirige vers Pélican Ville.'], ['9:30', 'Arrive au 1 allée des Saules et attend dans la cuisine.'], ['11:00', 'Va dans le séjour.'], ['15:00', 'Quitte 1 allée des Saules pour rentre à la maison.'], ['16:00', 'Arrive à la ferme.'], ['22:00', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['6:00', 'A la maison.'], ['8:00', 'Quitte la maison et se dirige vers Pélican Ville.'], ['9:30', 'Arrive à 1 allée des Saules et reste dans la cuisine.'], ['11:00', 'Quitte la maison.'], ['11:50', 'Fait du skateboard au sud de the Stardrop Saloon, près des bancs.'], ['15:00', 'Se dirige vers Saloon du fruit étoilé.'], ['15:30', 'Joue au billard à Saloon du fruit étoilé.'], ['21:00', 'Quitte the Saloon pour rentrer à la maison.'], ['22:00', 'Arrive à la ferme.']] },
      ] },
    ],
  },
  'sebastian': {
    intro: 'Le 4 de l’été, il a rendez-vous à la Clinique d’Harvey.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Dimanche-Mercredi (Et les jeudi de la première année)', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit pour aller sur son ordinateur.'], ['15:00', 'Laisse son ordinateur pour se rendre à la cuisine.'], ['15:40', 'Quitte la cuisine pour retourner dans sa chambre.'], ['16:10', 'Sur son ordinateur.'], ['18:30', 'Quitte la maison et se rend au lac à proximité pour fumer.'], ['19:30', 'Fume près du lac à côté de sa maison.'], ['21:30', 'Rentre à la maison.']] },
        { title: 'Jeudi (11ème & 25ème) (si il n’est pas ami avec Abigail)', rows: [['9:00', 'Dans son lit.'], ['10:00', 'Sort de son lit pour aller sur son ordinateur.'], ['12:00', 'Dans sa chambre, sur le canapé.'], ['17:30', 'Quitte sa chambre pour aller dans la cuisine.'], ['18:30', 'Sur son ordinateur.'], ['21:30', 'Va au lit.']] },
        { title: 'Jeudi (2ème année onwards)', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit pour aller à son ordinateur.'], ['14:00', 'Quitte sa maison pour aller fumer à la station de train.'], ['15:00', 'Fume à la station de train.'], ['18:20', 'A l’est de la gare, au tunnel.'], ['20:10', 'A l’ouest de la gare, au tunnel.'], ['21:30', 'Rentre chez lui.']] },
        { title: 'Vendredi', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit pour aller à son ordinateur.'], ['15:00', 'Sort de sa chambre pour aller jouer au billard avec Sam au Saloon.'], ['17:20', 'Au Saloon, joue au billard avec Sam.'], ['21:10', 'Rentre chez lui pour la nuit.']] },
        { title: 'Samedi', rows: [['9:00', 'Part de chez lui pour aller chez Sam.'], ['11:30', 'En face de chez Haley et Emily avec Sam.'], ['12:30', 'Suit Sam dans sa chambre.'], ['13:00', 'Dans la chambre de Sam.'], ['18:00', 'Part de chez Sam avec Sam et va à la rivière.'], ['18:20', 'Fume à côté de la rivière devant chez Sam avec Sam.'], ['19:30', 'Rentre chez lui depuis devant la maison de Sam.'], ['21:40', 'Arrive chez lui.']] },
        { title: 'Jour de pluie (option 1)', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit et part de chez lui pour aller à la plage.'], ['13:30', 'Est au bout de la jetée à droite de la boutique de Willy.'], ['17:00', 'Quitte la jetée pour rentrer chez lui.'], ['19:40', 'Arrive chez lui et va au lit']] },
        { title: 'Jour de pluie (option 2)', rows: [['9:00', 'Dans son lit'], ['10:30', 'Sort du lit pour aller sur son ordinateur'], ['15:00', 'Quitte la maison pour aller au saloon'], ['17:20', 'Au Saloon, dans le canapé rouge vers les jeux d’arcade'], ['21:10', 'Rentre chez lui pour la nuit.']] },
        { title: 'Fête des œufs', rows: [['9:00', 'Dans son lit.'], ['22:00', 'Devant la maison de Sam jusqu’à 2:00']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Dimanche-Mercredi', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort du lit pour aller sur son ordinateur.'], ['15:00', 'Quitte l’ordinateur pour aller à la cuisine.'], ['15:40', 'Quitte la cuisine pour retourner dans sa chambre.'], ['16:10', 'Sur son ordinateur.'], ['18:30', 'Part de chez lui et va au lac à côté de chez lui pour fumer.'], ['19:30', 'Fume au lac à côté de chez lui.'], ['21:30', 'Rentre chez lui.']] },
        { title: 'Jeudi', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort du lit pour aller sur son ordinateur.'], ['14:00', 'Part de chez lui.'], ['15:00', 'Arrive au panneau de la Voie ferrée.'], ['18:00', 'Se tient au tunnel Est de la Voie ferrée'], ['19:30', 'Se tient au tunnel Ouest de la Voie ferrée'], ['21:30', 'Part pour rentrer chez lui.'], ['22:20', 'Arrive chez lui.']] },
        { title: 'Jeudi 4', rows: [['9:00', 'Dans sa chambre, vers la bibliothèque.'], ['10:00', 'Quitte sa maison pour aller à la clinique d’Harvey.'], ['11:50', 'A la clinique dans la salle d’attente.'], ['13:40', 'A la clinique dans la salle d’examen.'], ['16:00', 'Rentre chez lui pour la nuit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit et va devant son ordinateur.'], ['15:00', 'Sort de sa chambre et va jouer au billard avec Sam au Saloon.'], ['17:20', 'Au Saloon, joue au billard avec Sam.'], ['21:10', 'Se dirige chez lui pour dormir.']] },
        { title: 'Samedi', rows: [['9:00', 'Sort de chez lui pour aller chez Sam.'], ['11:30', 'Devant la maison de Haley et Emily avec Sam.'], ['12:30', 'Suit Sam jusqu’a sa chambre.'], ['13:00', 'Dans la chambre de Sam.'], ['18:00', 'Sort de la maison de Sam et va avec lui à la rivière.'], ['18:20', 'Fume près de la rivière de la maison de Sam avec lui.'], ['19:30', 'Rentre à sa maison depuis la maison de Sam.'], ['21:40', 'Arrive chez lui.']] },
        { title: 'Jour de pluie (option 1)', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Quitte son lit et sort de la maison pour aller à la plage.'], ['13:30', 'Attend à la fin du long ponton à gauche de la boutique de pêche.'], ['17:00', 'Quitte le ponton pour rentrer dormir à la maison.']] },
        { title: 'Jour de pluie (option 2)', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit et va devant son ordinateur.'], ['15:00', 'Sort de la maison pour aller au Saloon.'], ['17:20', 'Au Saloon du fruit étoilé, assis sur le canapé rouge près de la borne d’arcade.'], ['21:10', 'Rentre chez lui pour dormir.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Lundi-Mercredi', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit et va devant son ordinateur.'], ['12:00', 'Sort de la maison et marche en direction du lac à coté de sa maison.'], ['16:00', 'Rentre chez lui pour dormir.']] },
        { title: 'Jeudi', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit et va devant son ordinateur.'], ['14:00', 'Sort de la maison pour aller fumer vers Voie ferrée.'], ['15:00', 'Fume à la Voie ferrée.'], ['18:20', 'Se tient au tunnel Est de la Voie ferrée'], ['20:10', 'Se tient au tunnel Ouest de la Voie ferrée'], ['21:30', 'Rentre chez lui pour dormir.']] },
        { title: 'Jeudi (11) *Peu d’amitié avec Abigail', rows: [['9:00', 'Dans son lit.'], ['10:00', 'Sort de son lit et va devant son ordinateur.'], ['12:00', 'Dans sa chambre, assis sur son canapé.'], ['17:10', 'Sort de sa chambre pour aller à la cuisine.'], ['18:00', 'Sort de la cuisine pour retourner dans sa chambre.'], ['18:30', 'Devant son ordinateur.'], ['21:30', 'Va se coucher.']] },
        { title: 'Vendredi', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit et va devant son ordinateur.'], ['15:00', 'Sort de sa chambre pour aller jouer au billard avec Sam au Saloon.'], ['17:20', 'Au Saloon du fruit étoilé, joue au billard avec Sam.'], ['21:10', 'Se dirige vers chez lui pour dormir.']] },
        { title: 'Samedi', rows: [['9:00', 'Sort de sa maison pour aller à celle de Sam.'], ['11:30', 'Devan la maison d’Haley et Emily avec Sam.'], ['12:30', 'Suit Sam dans sa chambre.'], ['13:00', 'Dans la chambre de Sam.'], ['18:00', 'Sort de la maison de Sam et va à la rivière avec lui.'], ['18:20', 'Fume près de la rivière davant la maison de Sam avec lui.'], ['19:30', 'Rentre à sa maison depuis le devant de la maison de Sam.'], ['21:40', 'Arrive à sa maison.']] },
        { title: 'Dimanche', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit et va devant son ordinateur.'], ['12:00', 'Sort de sa maison et marche jusqu’au lac à coté de sa maison.'], ['13:00', 'Se tient debout près du lac à coté de sa maison.'], ['16:00', 'Rentre chez lui dormir.']] },
        { title: 'Jour de pluie (option 1)', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit, quitte sa maison et va à la plage.'], ['13:30', 'Attend à la fin du long ponton à gauche de la boutique de pêche.'], ['17:00', 'Part du ponton pour retourner à sa maison.'], ['19:40', 'Arrive à sa maison et va se coucher.']] },
        { title: 'Jour de pluie (option 2)', rows: [['9:00', 'Dans son lit.'], ['10:30', 'Sort de son lit et va devant son ordinateur.'], ['15:00', 'Sort de sa maison pour aller au Saloon.'], ['17:20', 'Au Saloon du fruit étoilé, attend sur le canapé rouge près de l’arcade.'], ['21:10', 'Rentre à sa maison dormir.']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Dimanche - Mercredi', rows: [['10:30', 'Se réveille et va devant son ordinateur'], ['15:00', 'Sort de sa chambre et va dans la cuisine'], ['15:40', 'Retourne dans sa chambre devant son ordinateur'], ['18:30', 'Sort de sa maison et va à la rivière à l’Est de sa maison pour fumer'], ['21:30', 'Retourne à sa maison dormir']] },
        { title: 'Jeudi', rows: [['10:30', 'Se réveille et va devant son ordinateur'], ['14:00', 'Sort de sa maison et va à la Voie ferrée au nord de sa maison pour fumer'], ['18:00', 'Se tient au tunnel Est de la Voie ferrée'], ['19:30', 'Se tient au tunnel Ouest de la Voie ferrée'], ['21:30', 'Retourne à sa maison dormir']] },
        { title: 'Vendredi', rows: [['10:30', 'Se réveille et va devant son ordinateur'], ['15:00', 'Sort de sa maison et va au Saloon du fruit étoilé, joue au billard avec Sam toute la soirée'], ['21:00', 'Quitte le Saloon et rentre à son domicile']] },
        { title: 'Samedi', rows: [['9:00', 'Se reveille et se dirige vers la maison de Sam où il se rencontre à l’extérieur, au sud-est de la maison de Sam'], ['12:30', 'Se dirige dans la chambre de Sam avec lui'], ['18:00', 'Quitte la maison de Sam avec lui et fume près du lac'], ['19:30', 'Quitte la maison de Sam et rentrez à sa maison dormir.']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['6:00', 'À la maison.'], ['9:00', 'Quitte la maison et va à la montagne'], ['9:30', 'Traverse la place du village'], ['10:30', 'Arrive à son ancien emplacement au bord du lac de la montagne'], ['12:30', 'Part pour rendre visite à Robine.'], ['17:20', 'Quitte la montagne et se dirige à la maison pour la nuit.']] },
        { title: 'Vendredi', rows: [['6:00', 'À la maison.'], ['9:00', 'Part vers La plage.'], ['11:00', 'Attend à la fin du long ponton à gauche de la boutique de pêche.'], ['15:00', 'Se dirige vers le Saloon.'], ['16:30', 'Arrive au Saloon et joue au billard avec Sam.'], ['21:30', 'Rentre à la maison pour la nuit.']] },
        { title: 'Samedi', rows: [['6:00', 'À la maison, travaille sur sa moto à l’arrière de la ferme.']] },
      ] },
    ],
  },
  'shane': {
    intro: 'S’il pleut, Shane ira travailler au Marché Joja les samedis ou les dimanches, si le Centre communautaire n’est pas terminé. Il ira également travailler au Marché Joja jusqu’au lendemain de la fin du centre communautaire. Sinon, on le trouve généralement au Saloon du fruit étoilé le soir.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi - Vendredi (Centre communautaire non restauré)', rows: [['7:10', 'Quitte le Ranch de Marnie et se dirige vers le Marché Joja.'], ['17:00', 'Quitte le Marché Joja et se dirige vers le Saloon du fruit étoilé.'], ['23:10', 'Quitte le Saloon du fruit étoilé et retourne au Ranch de Marnie.']] },
        { title: 'Samedi (Centre communautaire non restauré)', rows: [['9:00', 'Sort de sa chambre et reste dans la cuisine au Ranch de Marnie.'], ['12:00', 'Quitte le Ranch de Marnie et se dirige vers Magasin général de Pierre.'], ['17:00', 'Quitte le Magasin général de Pierre et se dirige vers le Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et retourne au Ranch de Marnie.']] },
        { title: 'Lundi - Vendredi (Centre communautaire restauré)', rows: [['9:00', 'Sort de sa chambre et reste dans la cuisine au Ranch de Marnie.'], ['11:00', 'Quitte la cuisine et retourne dans sa chambre.'], ['12:00', 'Sort de sa chambre et reste à coté de la cheminée au Ranch de Marnie.'], ['14:00', 'Quitte le Ranch de Marnie se dirige vers le Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et retourne au Ranch de Marnie.']] },
        { title: 'Samedi (Centre communautaire restauré)', rows: [['9:00', 'Quitte sa chambre et va dans la cuisine au Ranch de Marnie.'], ['12:00', 'Quitte le Ranch de Marnie et va au Magasin général de Pierre.'], ['17:00', 'Quitte Magasin général de Pierre et va au Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et retourne au Ranch de Marnie.']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Lundi - Vendredi (Centre communautaire non restauré)', rows: [['7:10', 'Quitte le Ranch de Marnie et va au Marché Joja.'], ['17:00', 'Quitte le Marché Joja et va au Saloon du fruit étoilé.'], ['23:10', 'Quitte le Saloon du fruit étoilé et retourne au Ranch de Marnie.']] },
        { title: 'Samedi (Centre communautaire non restauré)', rows: [['9:00', 'Quitte sa chambre et reste dans la cuisine au Ranch de Marnie.'], ['12:00', 'Quitte le Ranch de Marnie et se dirige vers le Magasin général de Pierre.'], ['17:00', 'Quitte le Magasin général de Pierre et se dirige vers le Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et retourne au Ranch de Marnie.']] },
        { title: 'Dimanche(Centre communautaire non restauré)', rows: [['12:30', 'Reste dans la cuisine au Ranch de Marnie'], ['0:00', 'Va se coucher']] },
        { title: 'Lundi - Vendredi (Centre communautaire restauré)', rows: [['9:00', 'Quitte sa chambre et reste dans la cuisine au Ranch de Marnie.'], ['11:00', 'Quitte la cuisine et retourne dans sa chambre.'], ['12:00', 'Quitte sa chambre et reste à côté de la cheminée au Ranch de Marnie.'], ['14:00', 'Quitte le Ranch de Marnie et se dirige vers le Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et retourne au Ranch de Marnie.']] },
        { title: 'Samedi (Centre communautaire restauré)', rows: [['9:00', 'Quitte sa chambre et reste dans la cuisine au Ranch de Marnie.'], ['12:00', 'Quitte le Ranch de Marnie et se dirige vers le Magasin général de Pierre.'], ['17:00', 'Quitte le Magasin général de Pierre et se dirige vers le Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et retourne au Ranch de Marnie.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Lundi - Vendredi (Centre communautaire non restauré)', rows: [['7:10', 'Quitte le Ranch de Marnie et se dirige vers Marché Joja.'], ['17:00', 'Quitte Marché Joja et se dirige vers le Saloon du fruit étoilé.'], ['23:10', 'Quitte le Saloon du fruit étoilé et retourne à Ranch de Marnie.']] },
        { title: 'Samedi (Centre communautaire non restauré)', rows: [['9:00', 'Quitte sa chambre et reste dans la cuisine à Ranch de Marnie.'], ['12:00', 'Quitte Ranch de Marnie et se dirige vers Magasin général de Pierre.'], ['17:00', 'Quitte Magasin général de Pierre et se dirige vers le Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et retourne à Ranch de Marnie.']] },
        { title: 'Dimanche (Centre communautaire non restauré)', rows: [['9:00', 'Quitte sa chambre et reste dans la cuisine à Ranch de Marnie.'], ['0:00', 'Quitte la cuisine et va se coucher']] },
        { title: 'Lundi - Vendredi (Centre communautaire restauré)', rows: [['9:00', 'Quitte sa chambre et reste dans la cuisine à Ranch de Marnie.'], ['11:00', 'Quitte la cuisine et retourne dans sa chambre.'], ['12:00', 'Quitte sa chambre et reste à côté de la cheminée à Ranch de Marnie.'], ['14:00', 'Quitte Ranch de Marnie et se dirige vers le Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et retourne au Ranch de Marnie.']] },
        { title: 'Samedi (Centre communautaire restauré)', rows: [['9:00', 'Quitte sa chambre et va dans la cuisine'], ['12:00', 'Quitte le ranch et se rend au Magasin général de Pierre.'], ['17:00', 'Quitte le magasin et se rend au Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et rentre chez lui.']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Lundi - Vendredi (Centre communautaire non restauré)', rows: [['7:10', 'Quitte le ranch et se rend au Marché Joja.'], ['17:00', 'Quitte le Marché Joja et se rend au Saloon du fruit étoilé.'], ['23:10', 'Quitte le Saloon du fruit étoilé et revient dans le Ranch de Marnie.']] },
        { title: 'Samedi (Centre communautaire non restauré)', rows: [['9:00', 'Dans la cuisine du Ranch de Marnie.'], ['12:00', 'Quitte le Ranch de Marnie et se rend au Magasin général de Pierre.'], ['17:00', 'Quitte le magasin et se rend au Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et rentre au Ranch de Marnie.']] },
        { title: 'Lundi - Vendredi (Centre communautaire restauré)', rows: [['9:00', 'Quitte sa chambre et va dans la cuisine.'], ['11:00', 'Quitte la cuisine et va dans sa chambre.'], ['12:00', 'Quitte sa chambre et va devant la cheminée.'], ['14:00', 'Quitte le Ranch de Marnie et se rend au Saloon du fruit étoilé.'], ['23:00', 'Quitte le Saloon du fruit étoilé et rentre au Ranch de Marnie.']] },
        { title: 'Samedi(Centre communautaire restauré)', rows: [['9:00', 'Quitte sa chambre et va dans la cuisine.'], ['12:00', 'Quitte le Ranch de Marnie et va au Magasin général de Pierre.'], ['17:00', 'Quitte le magasin et se rend au Saloon du fruit étoilé.'], ['23:00', 'Quitte le saloon et rentre au Ranch de Marnie.']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['6:00', 'À la maison.'], ['9:30', 'Quitte la maison.'], ['10:30', 'Arrive au Ranch de Marnie.'], ['11:30', 'Quitte la ferme.'], ['11:50', 'Se tient sous le grand arbre au Nord de la Forêt Sève-Cendreuse.'], ['17:00', 'Rentre chez lui.'], ['19:30', 'Arrive chez lui.'], ['22:00', 'Se couche.']] },
        { title: 'Vendredi', rows: [['6:00', 'À la maison.'], ['8:30', 'Quitte la maison et se rend près de la rivière, en ville.'], ['10:00', 'Se tient près de la rivière.'], ['13:00', 'Quitte la rivière et se rend au Magasin général de Pierre.'], ['17:00', 'Quitte le magasin et se rend au Saloon du fruit étoilé.'], ['22:00', 'Rentre chez lui.']] },
      ] },
    ],
  },
  'penny': {
    intro: 'Penny peut être habituellement trouvée en ville en train de lire ou de faire du nettoyage dans sa Caravane qu’elle partage avec Pam. Les Mardi, Mercredi et Vendredi elle donne des cours particuliers à Jas et Vincent au Musée et les ramène ensuite chez eux. On peut supposer qu’elle prend son rôle au sérieux puisque sur son bureau, dans sa chambre à sa Caravane on peut trouver un livre ouvert dont le titre est : "Guide de l’enseignant : CE1". De Dimanches, elle les emmènera à l’aire de jeu de Pélican Ville. Le 4 Hiver, elle a un rendez-vous à la Clinique d’Harvey. Quand il est en train de pleuvoir, Penny peut être aussi trouvée à l’intérieur de sa Caravane ou en train de visiter le Musée à la section des livres.',
    groups: [
      { label: 'Printemps', blocks: [
        { title: 'Lundi, Jeudi, Dimanche', rows: [['8:10', 'Quitte sa Caravane et sort dehors pour lire près du cimetière du village.'], ['12:30', 'Retourne à la caravane pour nettoyer la vaisselle.'], ['16:00', 'Quitte de nouveau la caravane, pour aller en dehors du Saloon du fruit étoilé où elle s’assoit sur le banc avec Maru.'], ['18:40', 'Retourne à sa caravane pour le soir.']] },
        { title: 'Mardi, Mercredi, Vendredi', rows: [['9:00', 'Quitte sa Caravane et part au Musée. Jas et Vincent la rejoigne là bas.'], ['14:00', 'Quitte la bibliothèque et attend près du Stand de crème glacée surveillant Jas et Vincent.'], ['16:20', 'Avance jusqu’à la maison de Vincent et dit au revoir.'], ['17:50', 'Accompagne Jas jusqu’à chez elle et dit au revoir.'], ['18:30', 'Retourne à sa Caravane pour le soir.']] },
        { title: 'Samedi', rows: [['9:00', 'Dans sa chambre.'], ['10:00', 'Quitte sa caravane pour rejoindre Jas et Vincent près du cimetière du village.'], ['12:00', 'Accompagne Jas et Vincent à l’aire de jeu au dessus de la place et les regarde jouer.'], ['17:00', 'Raccompagne Jas et Vincent en ville et les dépose devant la maison de Emily et Haley.'], ['18:30', 'Retourne à sa Caravane pour le soir.']] },
      ] },
      { label: 'Été', blocks: [
        { title: 'Horaires réguliers', rows: [['8:10', 'Se lève et marche à travers Pélican Ville pour rejoindre la rivière derrière le Marché Joja.'], ['13:00', 'Va près du Centre communautaire et s’assied.'], ['18:00', 'Quitte Pélican Ville et retourne à la caravane pour faire la vaisselle.'], ['20:00', 'Se couche dans sa chambre.']] },
        { title: 'Temps ensoleillé', rows: [['8:00', 'Quitte la Caravane et marche à travers La ville.'], ['12:00', 'S’assied dans la Scierie.'], ['18:00', 'Quitte la scierie et retourne dans sa caravane pour faire la vaisselle.'], ['21:00', 'Se couche dans sa chambre.']] },
        { title: 'Lundi (ensoleillé)', rows: [['8:00', 'Se lève et marche à travers Pélican Ville pour rejoindre la rivière derrière le Marché Joja.'], ['9:30', 'Regarde la rivière près du Marché Joja..'], ['13:00', 'Marche vers le Centre communautaire.'], ['14:30', 'S’assied sur un banc à droite du Centre communautaire.'], ['18:00', 'Retourne dans sa caravane.'], ['19:00', 'Reste dans la caravane pour la soirée.']] },
        { title: 'Mardi (ensoleillé)', rows: [['8:00', 'Se lève, quitte la Caravane et sort près du cimetière du village.'], ['9:00', 'Lit un livre sous un arbre près du cimetière du village.'], ['12:30', 'Retourne à la caravane.'], ['16:00', 'Quitte la caravane pour aller s’asseoir sur un banc devant le Saloon du fruit étoilé.'], ['18:30', 'Quitte Pélican Ville et retourne à sa caravane.'], ['19:00', 'Reste dans la caravane pour la soirée.']] },
        { title: 'Mercredi (ensoleillé)', rows: [['9:00', 'Quitte la caravane et marche vers le Musée'], ['10:00', 'Dans le Musée.'], ['14:00', 'Pélican Ville, près du pont à proximité du Musée.'], ['16:00', 'Raccompagne Vincent et Jas, près du 2 allée des Saules.'], ['18:30', 'Quitte le Ranch de Marnie et rentre chez elle pour la soirée.'], ['20:00', 'Reste dans la caravane pour la soirée.']] },
        { title: 'Jeudi (ensoleillé)', rows: [['8:00', 'Se lève et marche à travers Pélican Ville pour rejoindre la rivière derrière le Marché Joja.'], ['9:30', 'Regarde la rivière derrière le Marché Joja.'], ['13:00', 'Marche vers le Centre communautaire.'], ['14:30', 'S’assied à droite du Centre communautaire.'], ['18:00', 'Quitte la ville et retourne dans sa caravane.'], ['19:00', 'Reste dans la caravane pour la soirée.']] },
        { title: 'Vendredi (ensoleillé)', rows: [['9:00', 'Quitte sa Caravane et se dirige vers le Musée.'], ['10:00', 'Dans le Musée.'], ['14:00', 'Hors du Musée, près du pont.'], ['16:00', 'Raccompagne Vincent et Jas en passant par le 2 allée des Saules.'], ['18:30', 'Quitte le Ranch de Marnie et retourne chez elle pour la soirée.'], ['20:00', 'Reste dans la caravane pour la soirée.']] },
        { title: 'Samedi (ensoleillé)', rows: [['10:00', 'Se lève, quitte la Caravane et sort près du cimetière du village.'], ['11:00', 'Avec les enfants près du cimetière.'], ['12:00', 'Accompagne les enfants près de l’aire de jeu, à gauche du Centre communautaire.'], ['13:00', 'A l’aire de jeu, joue avec les enfants.'], ['17:00', 'Accompagne Jas et Vincent à la maison d’Emily.'], ['18:00', 'Parle aux enfants à côté de la maison d’Emily.'], ['20:00', 'Rentre à la caravane.'], ['21:00', 'Reste à la caravane pour la soirée.']] },
        { title: 'Dimanche (ensoleillé)', rows: [['8:00', 'Se lève et marche à travers Pélican Ville pour rejoindre la rivière, derrière le Marché Joja.'], ['9:30', 'Regarde la rivière derrière le Marché Joja.'], ['13:00', 'Se dirige vers le Centre communautaire.'], ['14:30', 'S’assied à droite du Centre communautaire.'], ['18:00', 'Quitte la ville et retourne dans sa caravane.'], ['19:00', 'Reste dans la caravane pour la soirée.']] },
      ] },
      { label: 'Automne', blocks: [
        { title: 'Dimanche, Lundi, Jeudi', rows: [['8:00', 'Se lève, quitte sa Caravane et va lire près du cimetière.'], ['12:30', 'Retourne à sa caravane, faire la vaisselle.'], ['16:00', 'Quitte la caravane et s’assied sur un banc près du Saloon du fruit étoilé, avec Maru le Dimanche et le Lundi, seule le Jeudi.'], ['18:40', 'Retourne à sa caravane pour la soirée.'], ['19:20', 'Se couche.']] },
        { title: 'Mardi, Mercredi, Vendredi', rows: [['9:00', 'Quitte la Caravane et va vers le Musée.'], ['10:00', 'Au Musée. Vincent la rejoint à 10h30, Jas à 11h.'], ['14:00', 'Va à la rivière près du Musée, au pont.'], ['16:20', 'Raccompagne les enfants en passant par le 2 allée des Saules. S’y arrête.'], ['17:40', 'Continue vers le Ranch de Marnie, raccompagne Jas chez elle pour la soirée.'], ['18:30', 'Laisse Jas au Ranch et retourne chez elle pour la soirée.'], ['20:00', 'Arrive à la caravane, puis se couche.']] },
        { title: 'Samedi', rows: [['10:00', 'Sort du lit.'], ['11:00', 'Retrouve Jas et Vincent à l’arbre où elle va parfois lire, près du cimetière.'], ['12:00', 'Se dirige avec les enfants vers l’aire de jeu.'], ['13:00', 'A l’aire de jeu avec les enfants.'], ['17:00', 'Quitte l’aire de jeu et se rend à la maison d’Emily avec les enfants.'], ['18:20', 'Arrive devant la maison d’Emily.'], ['20:00', 'Jas et Vincent rentrent chez eux, et Penny rentre à la caravane.'], ['20:40', 'Arrive à la caravane et va au lit.']] },
      ] },
      { label: 'Hiver', blocks: [
        { title: 'Horaires standardds', rows: [['8:00', 'Se lève, quitte sa Caravane et va lire près du cimetière.'], ['12:30', 'Retourne à sa caravane pour faire la vaisselle.'], ['16:00', 'Quitte la caravane pour aller s’asseoir sur le banc près du Saloon du fruit étoilé avec Maru.'], ['18:40', 'Retourne à sa caravane pour la soirée.']] },
        { title: 'Mercredi, Vendredi', rows: [['9:00', 'Quitte la Caravane et marche vers le Musée.'], ['10:00', 'Au Musée. Vincent la rejoint à 10h30, Jas à 11h.'], ['14:00', 'Va au pont près du Musée.'], ['16:20', 'Raccompagne les enfants en passant par le 2 allée des Saules. S’y arrête.'], ['17:40', 'Continue vers le Ranch de Marnie, raccompagne Jas chez elle pour la soirée.'], ['18:30', 'Laisse Jas au Ranch et retourne chez elle pour la soirée.'], ['20:00', 'Arrive à la caravane et se couche.']] },
        { title: 'Samedi', rows: [['14:30', 'A l’aire de jeu avec Jas et Vincent.'], ['17:00', 'Accompagne les enfants à la maison d’Emily.'], ['18:20', 'A côté de la maison d’Emily, parle avec Jas et Vincent.'], ['20:00', 'Va à la caravane avec Jas.'], ['20:10', 'Reste à la caravane pour la soirée.']] },
        { title: 'Hiver (Centre communautaire restauré)', rows: [['9:00', 'Se lève et se ballade dans la Caravane.'], ['10:30', 'Quitte la caravane et marche vers le Centre communautaire pour aller lire.'], ['15:00', 'Se ballade autour du Centre communautaire.'], ['18:00', 'Quitte le Centre communautaire et retourne à sa caravane pour faire la vaisselle.'], ['21:00', 'Se couche.']] },
        { title: '4 d’Hiver', rows: [['9:00', 'Se lève et se balade dans sa Caravane.'], ['11:30', 'Se rend à la Clinique d’Harvey pour son examen annuel.'], ['13:30', 'A son examen, à la clinique.. "Hey! un peu d’intimité, s’il te plait ?"'], ['16:00', 'Quitte la clinique et va s’asseoir à Pélican Ville.'], ['19:00', 'Quitte la ville et retourne à sa caravane pour faire la vaisselle.'], ['21:00', 'Se couche pour la soirée.']] },
      ] },
      { label: 'Exceptions', blocks: [
        { title: 'Jour 23 pluvieux', rows: [['8:00', 'Se lève et quitte la Caravane.'], ['8:50', 'S’assied sous un arbre, près du cimetière.'], ['12:30', 'Retourne à sa caravane pur faire la vaisselle.'], ['16:00', 'Quitte sa caravane pour retourner en ville.'], ['16:30', 'S’assied sur le banc au Sud du Saloon.'], ['18:40', 'Retourne à sa caravane et va se coucher pour la soirée.']] },
        { title: 'Jour 9 et Jour 23 (avec moins de 6 Coeurs avec Sam)', rows: [['9:00', 'Se lève et se ballade dans sa Caravane.'], ['11:00', 'Va s’asseoir en Ville.'], ['16:00', 'Retourne à sa caravane et fait la vaisselle.'], ['18:30', 'Se couche pour la soirée.']] },
        { title: 'Jour de pluie (Alternative A)', rows: [['9:00', 'La Caravane est déverrouillée. Penny est dans sa chambre.'], ['11:00', 'Va à la cuisine.'], ['13:00', 'Fait la vaisselle.'], ['15:00', 'S’assied sur la banquette, regarde (probablement) la télé.'], ['18:00', 'Retourne dans sa chambre et lit.'], ['21:00', 'Se couche pour la soirée.']] },
        { title: 'Jour de pluie (Alternative B)', rows: [['8:20', 'Quitte sa Caravane et va s’asseoir près du Musée. "Je vais sortir, j’ai juste envie d’un moment calme."'], ['12:00', 'Va dans le Musée et regarde les bibliothèques.'], ['16:00', 'Quitte le Musée et retourne à sa caravane pour regarder la télé.'], ['19:00', 'Fait un peu de vaisselle.'], ['21:00', 'Se couche pour la soirée.']] },
      ] },
      { label: 'Mariage', blocks: [
        { title: 'Lundi', rows: [['8:30', 'Quitte la Maison de ferme et va au Magasin général de Pierre.'], ['11:30', 'Quitte la magasin. Va lire en ville.'], ['16:00', 'S’assied en ville.'], ['18:10', 'Quitte la ville et retourne à la maison.'], ['22:00', 'Se couche.']] },
        { title: 'Mardi, Mercredi, Vendredi', rows: [['8:30', 'Quitte la Maison de ferme et va au Musée. "Bonjour, chéri. C’est gentil de ta part de venir me voir au travail."'], ['14:00', 'Quitte le Musée et marche avec Vincent et Jas en ville.'], ['16:20', 'Devant la maison d’Haley et Emily en marchant avec les enfants.'], ['17:50', 'Raccompagne Jas au Ranch de Marnie.'], ['18:30', 'Quitte le Ranch et retourne à la maison pour la soirée.'], ['22:00', 'Se couche']] },
      ] },
    ],
  },
  'robin': {
    intro: 'La plupart des jours, Robine se réveille à 8h et marche vers sa Scierie pour l’ouvrir à 9h. Elle se ballade souvent dans la région de la Montagne aux alentours de sa maison après avoir fermé son magasin à 17h, et stoppe n’importe quelle activité qu’elle est en train de faire pour aller au lit à 21h. Son magasin est fermé les Mardis quand elle participe hebdomadairement à la réunion du Club d’aérobic chez Caroline. Si le joueur reste en travers de son chemin lorsqu’elle veut sortir (non loin de de la caisse enregistreuse à 9h40), il peut utiliser temporairement son magasin. Celui-ci peut être aussi utilisé lorsqu’elle revient à 20h50. Les Vendredis soirs, elle ferme plus tôt son magasin à 16h pour aller au Saloon du fruit étoilé où elle et son mari viennent danser et fréquenter les Villageois présents ce même soir au Saloon.',
    groups: [
      { label: '', blocks: [
        { title: 'Temps Pluvieux', rows: [['9:00', 'Se tient derrière le comptoir de son magasin à la Scierie.'], ['17:00', 'Quitte son magasin et marche dans le salon.'], ['21:00', 'Va au lit.']] },
        { title: 'Lundi, Centre Communautaire réparé', rows: [['9:00', 'Se tient derrière le comptoir de son magasin à la Scierie.'], ['17:00', 'Quitte son magasin et marche vers le Centre communautaire.'], ['19:40', 'Quitte le Centre communautaire pour retourner chez elle.'], ['22:00', 'Va au lit']] },
        { title: 'Mardi', rows: [['9:30', 'Marche vers le Magasin général de Pierre pour assister à la réunion avec Jodi, Caroline, Emily, et Marnie.'], ['13:00', 'Est au Magasin général de Pierre.'], ['18:00', 'Quitte le Magasin général de Pierre et prend le chemin du retour vers sa Maison.'], ['21:00', 'Va au lit']] },
        { title: '18 Été', rows: [['8:00', 'Quitte sa Scierie et marche vers la Clinique d’Harvey.'], ['16:00', 'Quitte la Clinique d’Harvey et retourne à sa Maison.'], ['21:00', 'Va au lit.']] },
        { title: 'Vendredi', rows: [['9:00', 'Se tient derrière le comptoir de son magasin à la Scierie.'], ['16:00', 'Quitte son magasin et marche vers le Saloon du fruit étoilé.'], ['19:20', 'Est au Saloon du fruit étoilé, en train de danser avec Demetrius.'], ['21:00', 'Quitte le Saloon du fruit étoilé et retourne à sa Scierie puis va au lit.']] },
        { title: 'Horaire habituel', rows: [['9:00', 'Se tient derrière le comptoir de son magasin à la Scierie.'], ['17:00', 'Quitte son magasin et se dirige vers la zone des Montagne.'], ['19:30', 'Quitte la zone des Montagnes et retourne chez elle.'], ['21:00', 'Va au lit.']] },
      ] },
    ],
  },
  'vincent': {
    intro: 'La plupart du temps, Vincent se réveille à 9h00, joue à l’intérieur pendant quelques heures avant de se rendre en ville. Il rentre généralement chez lui vers 19h00. Le mardi, mercredi et vendredi, lui et Jas passent tous l’après-midi au Musée sous la tutelle de Penny. Elle ne leur fait classe pendant l’été cependant, et pendant cette saison, il est souvent à la plage. Vincent ne quitte pas la maison les jours de pluies, à moins que ce ne soit le 11 printemps, lors de sa visite à la Clinique d’Harvey. Ses horaires peuvent varier s’il y a des conditions spécifiques comme la saison, la météo ou certains jours de la semaine. Vous trouverez ci-dessous ses horaires classées (lorsqu’il peut, cet horaire l’emportera sur le calendrier).',
    groups: [
      { label: '', blocks: [
        { title: '11 printemps', rows: [['9:00', 'Se réveille, inquiet de devoir aller à la Clinique d’Harvey. "*sanglot*... Je dois me faire vacciner aujourd’hui."'], ['11:30', 'Quitte la maison pour se rendre à la clinique pour son bilan de santé annuel. "*gulp*... Maman, ne m’oblige pas à le faire."'], ['13:30', 'Poursuite de l’examen à la clinique. "Est-ce que je reçois une sucette pour avoir été si courageux ?"'], ['16:00', 'Quitte la clinique pour rentrée à la maison, une fois là, il joue à l’intérieur.'], ['22:00', 'Va au lit pour la nuit.']] },
        { title: 'Jour de pluie', rows: [['9:00', 'Se réveille.'], ['11:00', 'Joue à l’intérieur de sa maison.'], ['14:00', 'Se déplace à l’intérieur de la maison.'], ['17:00', 'Se déplace à l’intérieur de la maison.'], ['19:00', 'Joue à l’intérieur de la maison.'], ['22:00', 'Va au lit pour la nuit.']] },
        { title: 'Été', rows: [['9:00', 'Se réveille.'], ['11:00', 'Joue à l’intérieur de sa maison.'], ['13:40', 'Pars de la maison et se rend à La plage.'], ['19:00', 'Pars de La plage et rentre à la maison.'], ['23:00', 'Va au lit pour la nuit.']] },
        { title: 'Mardi, Mercredi, Vendredi', rows: [['9:00', 'Pars de la maison et se promène au Musée pour l’enseignement de Penny.'], ['14:00', 'Quitte le Musée, marche vers Pélican Ville.'], ['16:20', 'Marche aux alentours de Pélican Ville.'], ['17:40', 'Pars de la ville et rentre chez lui.'], ['22:00', 'Va au lit pour la nuit.']] },
        { title: 'Samedi', rows: [['10:10', 'Pars de la maison et se dirige vers la ville.'], ['12:00', 'Direction la place de la ville.'], ['17:00', 'Quitte la place de la ville et se promène dans la ville.'], ['22:00', 'Rentre chez lui pour se mettre au lit pour la nuit.']] },
        { title: 'Horaires normaux', rows: [['9:00', 'Se réveille.'], ['11:00', 'Joue à l’intérieur de sa maison.'], ['14:00', 'Quitte la maison et se dirige vers la place de la ville.'], ['17:00', 'Quitte la place de la ville et rentre chez lui.'], ['19:00', 'Joue à l’intérieur de la maison.'], ['22:00', 'Va au lit pour la nuit.']] },
      ] },
    ],
  },
  'sorcier': {
    intro: 'Le Sorcier ne quitte jamais la Tour du sorcier (sauf pour les festivals), et peut être trouvé là-bas quand la tour est accessible (de 6h à 23h). Après que le joueur ait débloqué la Hutte de la sorcière, il peut être trouvé dans sa tour après 23h en utilisant le point de téléportation dans la hutte de la sorcière.',
    groups: [
    ],
  },
  'willy': {
    intro: 'La plupart du temps Willy se réveille autour de 6h10, et va pêcher sur La plage pendant quelques heures avant d’ouvrir sa boutique de 9h à 17h. Il va parfois pêcher davantage après avoir fermé boutique, autour de 22h. Durant l’Hiver, il ira au Saloon du fruit étoilé plutôt qu’à la plage après son travail. Le 9 de Printemps, il a son rendez-vous annuel à la clinique. La boutique de Willy est fermée le Samedi lorsqu’il va pêcher, sauf s’il pleut et dans ce cas la boutique reste ouverte. Ses horaires peuvent changer selon des conditions spécifiques comme les saisons, la météo ou certains jours de la semaine. Ci-dessous sont présentées ses déviations d’horaires priorisés du plus haut au plus bas (par exemple : les horaires de jours pluvieux ont la priorité sur ceux d’en dessous).',
    groups: [
      { label: '', blocks: [
        { title: '9 de Printemps', rows: [['6:10', 'Se réveille et va pêcher sur la plage.'], ['8:50', 'Retourne dans sa boutique.'], ['9:00', 'Commence à travailler à son comptoir. "J’ai rendez-vous chez le médecin aujourd’hui, alors dépêche-toi si tu as besoin de quelque chose."'], ['10:10', 'Quitte la poissonnerie et se rend à la Clinique d’Harvey. "Hé, j’ai un hameçon planté dans le pouce... Le docteur va l’enlever."'], ['13:30', 'A son rendez-vous médical. "Aïe ! Ça fait mal, Docteur !"'], ['23:20', 'Quitte le saloon et rentre chez lui pour la nuit.']] },
        { title: 'Pluvieux', rows: [['6:10', 'Se réveille et va pêcher sur la plage.'], ['8:50', 'Rentre chez lui.'], ['9:00', 'Commence à travailler à son comptoir.'], ['23:20', 'Quitte le saloon et rentre chez lui.']] },
        { title: 'Samedi (Jour de repos)', rows: [['6:10', 'Se réveille et va pêcher dans la rivière, près de la Maison de Leah.']] },
        { title: 'Hiver', rows: [['6:10', 'Se réveille et va pêcher sur la plage.'], ['8:50', 'Rentre dans sa boutique.'], ['9:00', 'Commence à travailler à son comptoir.'], ['23:20', 'Quitte le saloon et rentre chez lui.']] },
        { title: 'Vendredi', rows: [['6:10', 'Se réveille et va pêcher sur la plage.'], ['8:50', 'Rentre chez lui.'], ['9:00', 'Commence à travailler à son comptoir.'], ['23:20', 'Quitte le saloon et rentre chez lui.']] },
        { title: 'Horaires réguliers', rows: [['6:10', 'Se réveille et va pêcher sur la plage.'], ['8:50', 'Rentre chez lui.'], ['9:00', 'Commence à travailler à son comptoir.']] },
      ] },
    ],
  },
  'sandy': {
    intro: 'Sandy ne quitte pas l’Oasis, et s’y trouve lorsque le magasin est ouvert, de 9h à 23h50 sauf le 25 de l’Hiver. Le 25 de l’Hiver, malgré la fête de l’Étoile Hivernale, le bus fonctionne toujours selon l’horaire habituel de Pam, ce qui permet au joueur d’accéder au désert; cependant, l’Oasis est fermée à clé.',
    groups: [
    ],
  },
  'pierre': {
    intro: 'Pierre gère son magasin général chaque jour entre 9h et 17h (sauf le mercredi où le magasin est fermé). Après le travail, il quitte le comptoir du magasin et se déplace dans sa maison. Le vendredi soir après le travail, il se rend à pied au saloon pour socialiser, à condition qu’il ne pleuve pas. En dehors du vendredi soir, des festivals et des événements, Pierre ne se déplace pas en dehors de son domicile. Après la restauration complète du Centre communautaire, son magasin ne sera plus fermé le mercredi, mais sera ouvert tous les jours de la semaine.',
    groups: [
      { label: '', blocks: [
        { title: 'Horaires habituels', rows: [['7:00', 'Dans les rayons du magasin général.'], ['8:30', 'Va se mettre derrière le comptoir du magasin général.'], ['17:00', 'Quitte le comptoir et retourne dans les rayons.'], ['19:00', 'Va dans la cuisine de sa maison.'], ['21:00', 'Va dans sa chambre et se tient devant la bibliothèque.'], ['23:00', 'Va dormir.']] },
        { title: 'Vendredi (sans pluie)', rows: [['7:00', 'Dans les rayons du magasin général.'], ['8:30', 'Va se mettre derrière le comptoir du magasin général.'], ['17:00', 'Va au Saloon du fruit étoilé et se met devant le comptoir.'], ['22:50', 'Retourne chez lui pour dormir.']] },
      ] },
    ],
  },
}
