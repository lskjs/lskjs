import React from 'react';
import Tag from 'antd/lib/tag';
import Avatar from '../../../Avatar';

export const notificationsData = [
  {
    icon: 'mail',
    iconProps: {
      background: '#17a2b8',
      color: '#fff',
    },
    title: '5 new newsletters',
    datetime: '1 hour ago',
  }, {
    icon: 'star-o',
    iconProps: {
      background: '#ffc53d',
      color: '#fff',
    },
    title: 'New collection saved',
    datetime: '5 hour ago',
  }, {
    icon: 'plus',
    iconProps: {
      background: '#66bb6a',
      color: '#fff',
    },
    title: 'Task added successfully',
    datetime: 'Yesterday',
  }, {
    icon: 'delete',
    iconProps: {
      background: '#ff4d4f',
      color: '#fff',
    },
    title: 'Member Jason removed',
    datetime: 'A week ago',
  },
];

export const messagesData = [
  {
    leftComponent: <Avatar src="//picsum.photos/80?random" />,
    title: 'New mail from Jason',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    datetime: '5 minutes ago',
  }, {
    leftComponent: <Avatar src="//picsum.photos/80?random" />,
    title: '2 messages from Bella',
    desc: 'Tempor incididunt ut labore et dolore magna aliqua',
    datetime: '15 minutes ago',
  }, {
    leftComponent: <Avatar src="//picsum.photos/80?random" />,
    title: 'New member Emily joined',
    desc: 'Ut enim ad minim veniam quis nostrud exercitation',
    datetime: '1 hour ago',
  },
];

export const tasksData = [
  {
    title: (
      <div>
        Publish version 4.0
        <Tag color="#17a2b8">WIP</Tag>
      </div>
    ),
    desc: 'Ullamco laboris nisi ut aliquip ex ea commodo',
  }, {
    title: (
      <div>
        New material design
        <Tag color="#ff4d4f">Stopped</Tag>
      </div>
    ),
    desc: 'Duis aute irure dolor in reprehenderit in',
  }, {
    title: (
      <div>
        Better documentation
        <Tag>Waiting</Tag>
      </div>
    ),
    desc: 'Cillum dolore eu fugiat nulla pariatur',
  }, {
    title: (
      <div>
        Start public beta test
        <Tag color="#66bb6a">Waiting</Tag>
      </div>
    ),
    desc: 'Sunt in culpa qui officia deserunt mollit',
  },
];

/* eslint-disable */
export const contentData = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida, mi vitae scelerisque ultricies, mi nibh ullamcorper erat, suscipit bibendum lectus felis ut libero. Fusce et pharetra orci, sit amet tincidunt ligula. Pellentesque sodales justo pellentesque enim faucibus, sed scelerisque magna eleifend. Etiam commodo nibh id purus sollicitudin aliquet. Ut quis justo sit amet est facilisis sagittis nec tempus metus. Curabitur nec tellus augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ultricies aliquam mauris, vel molestie metus suscipit nec. Praesent non odio et augue dictum hendrerit in interdum diam. Mauris ultricies leo id purus fermentum bibendum. Vivamus sollicitudin lectus at elit dapibus luctus. Nam est purus, fermentum sit amet est finibus, vestibulum consectetur erat. Proin ut risus tristique, consequat augue vitae, faucibus nisl.

Maecenas vel bibendum felis. Vestibulum nec mauris mattis, sodales ex quis, volutpat ligula. Nullam non eros mauris. Pellentesque lacinia eu neque vel faucibus. Nunc porta a felis nec fermentum. Aenean commodo ipsum at risus lacinia tempus vitae nec dui. Donec sed porttitor nulla. Integer viverra purus augue, eget imperdiet urna maximus congue. Nunc a erat et arcu congue venenatis. Curabitur mattis feugiat metus, eget eleifend purus interdum et. Quisque a erat non odio ultrices sagittis eget eu lacus. Phasellus turpis nisl, pulvinar a congue a, lobortis non purus. Phasellus non vulputate purus. Vivamus vel vulputate neque. Quisque efficitur quam at cursus gravida.

Fusce et convallis turpis. Nullam metus erat, lobortis sit amet erat a, bibendum tempus nunc. Pellentesque erat dolor, tempus auctor imperdiet eleifend, scelerisque eu purus. Nam lobortis, magna a tempor congue, turpis lectus ultricies justo, eget fringilla ante lacus vitae orci. Fusce pellentesque sapien non vestibulum semper. Mauris vitae tellus in enim dictum facilisis vel ac lacus. Cras mollis odio quis mi cursus maximus. Aliquam pretium, mauris eu rhoncus hendrerit, risus erat auctor urna, aliquet condimentum tellus est sit amet augue. Donec dapibus libero tristique congue feugiat. Quisque nec sapien rutrum, venenatis ipsum quis, viverra ante. Vestibulum venenatis libero lacus, sed molestie eros pulvinar eget. Suspendisse justo nibh, ullamcorper vitae mauris non, venenatis dapibus odio. Nullam auctor aliquet congue. Sed mauris mauris, rhoncus non lacinia a, molestie vel lorem. Sed ultricies sapien pharetra, condimentum velit ut, ultricies lectus. Pellentesque quis fringilla mi, id semper leo.

Aliquam non feugiat lectus. Suspendisse lorem odio, facilisis at turpis non, dictum tincidunt mauris. Mauris rutrum vehicula massa at scelerisque. Nullam vel tempor nibh. Aliquam viverra semper pulvinar. Ut sed venenatis enim, eget dignissim lacus. Maecenas vitae imperdiet est, non imperdiet dolor. Duis lacinia lorem quis risus ultrices maximus. Donec sed tortor porttitor, placerat massa at, posuere enim. Sed augue mi, volutpat vel dictum eu, tempor et libero. Mauris lobortis, sem sed consequat faucibus, elit ex vehicula urna, vitae consectetur velit tortor sit amet libero. Nunc viverra, sem eget imperdiet congue, felis elit finibus enim, eget ultrices lectus diam ac nulla. Suspendisse iaculis non ex et feugiat. Nulla euismod dictum auctor.

Suspendisse faucibus dolor tortor, eget varius nibh ultrices a. Fusce placerat molestie nisl, ut fringilla nisl facilisis non. Sed laoreet sapien ut iaculis maximus. Donec dui ante, dictum vel ipsum quis, faucibus fermentum est. Cras ac ipsum nisl. Maecenas vitae facilisis nulla. Vestibulum in dolor nisl. Sed enim lorem, blandit a sollicitudin vulputate, tempus non quam. Integer facilisis sollicitudin purus, a varius neque viverra eget. Nulla dapibus nunc ut erat ullamcorper dignissim. Nulla facilisi. Donec id auctor erat. Phasellus ac tempor lectus, nec tempus odio. Duis ipsum odio, cursus sed libero in, ultricies varius ipsum. Nulla aliquam rhoncus leo volutpat gravida. Morbi tincidunt risus ac dui molestie, sed suscipit ipsum sagittis.

Morbi at viverra dolor, non congue magna. Phasellus in sapien sed erat accumsan aliquam. Duis egestas cursus ligula, eu fringilla nisi interdum ac. Suspendisse ac laoreet est, vel rutrum leo. Integer eget tincidunt magna. Curabitur vulputate euismod dui, ac maximus libero iaculis sed. Aliquam erat volutpat. Donec sed tortor vel est interdum imperdiet. Nulla tempus enim in tortor accumsan, quis ornare purus volutpat. Aliquam auctor justo sit amet sapien viverra pretium. Proin fringilla ultrices quam, in efficitur lorem sodales et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Quisque varius enim lacus, sed eleifend libero aliquam sed. Etiam sodales turpis sit amet felis rutrum tristique. Duis et tincidunt justo, nec pharetra ante. Donec id mi a lacus viverra lacinia. Etiam vel lectus quis augue tincidunt tincidunt eget id justo. Duis non congue mauris. In tempus ante non sapien maximus rutrum. Duis dapibus odio elit, a volutpat risus commodo a. Praesent bibendum lobortis tempor.

Maecenas non dignissim leo. Nunc mollis sapien nec sem auctor, sed rhoncus metus luctus. Fusce pellentesque eros sed nisi bibendum sagittis. Morbi imperdiet aliquet augue non egestas. Nunc scelerisque magna quis est fermentum vestibulum. Sed efficitur, ex in scelerisque tempor, est tellus egestas felis, non finibus magna ipsum nec purus. Ut iaculis, elit accumsan rhoncus blandit, arcu libero dapibus orci, at sagittis odio ex ornare mi. Donec diam eros, posuere ac iaculis ac, porttitor sed orci.

Aenean augue orci, cursus lacinia auctor vel, lobortis a sem. Mauris tempor eros nec tristique placerat. Suspendisse ultricies ullamcorper nulla, vel imperdiet nunc. Curabitur vulputate ligula magna, in condimentum nisl mollis gravida. Vivamus lorem enim, facilisis et ullamcorper et, vestibulum a orci. Ut pellentesque lobortis purus, quis euismod purus laoreet nec. Etiam placerat gravida augue, non porttitor sem scelerisque et. In ultrices sagittis lectus, sed ornare magna tincidunt vitae. Sed quis facilisis tellus. Donec quam mauris, ornare a aliquet interdum, efficitur ac est. Phasellus nec consectetur lectus, elementum convallis urna.

Morbi sed erat nec nulla sodales tristique. Cras cursus mauris leo, sed laoreet leo consectetur euismod. Mauris sit amet massa at velit luctus mollis. Proin porta odio ac nulla mattis, eget imperdiet augue rhoncus. Suspendisse potenti. Phasellus velit urna, sollicitudin non elit vitae, porta pretium ligula. Nullam vel egestas nulla. Donec viverra orci urna, sed cursus velit venenatis in. Pellentesque eu sollicitudin mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam enim odio, interdum in nisl vehicula, consequat ornare lectus.

Nullam sodales sodales commodo. Sed vel sapien venenatis, commodo lacus sit amet, rhoncus ex. Donec a leo in eros imperdiet volutpat sit amet et felis. Nunc consequat dapibus turpis, et laoreet elit laoreet eu. Duis interdum dui sit amet rhoncus viverra. Integer eleifend vehicula aliquam. Nam posuere nec dolor at molestie. Etiam nec sollicitudin nibh, in accumsan elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam et volutpat felis. Curabitur euismod nibh quis dictum consequat. Aliquam ullamcorper consectetur enim sit amet tincidunt.

Pellentesque dignissim purus quis tempus gravida. Nunc sit amet rutrum purus, non tincidunt odio. Sed convallis augue vel libero consequat, eu hendrerit mi pellentesque. Donec volutpat euismod leo, et fermentum nulla pellentesque quis. Quisque ex quam, vulputate non consectetur sed, vehicula in enim. Maecenas gravida ex nulla, eget fermentum magna venenatis eu. Vestibulum mollis orci ac luctus feugiat. Suspendisse blandit turpis vel luctus tristique. Phasellus semper ligula at libero sollicitudin tincidunt. Aliquam maximus maximus aliquet. Phasellus porttitor porta nibh rhoncus imperdiet. Fusce vel nisl urna. Donec laoreet magna augue, sit amet interdum ipsum tempus sit amet. Sed velit nulla, egestas ac sem at, pulvinar fringilla mi. Nam iaculis lectus eu lacus faucibus, a egestas mauris venenatis.

Vestibulum in imperdiet risus, eget ultrices lorem. Integer dui urna, dapibus ut tellus a, laoreet consectetur dolor. Nam in aliquet turpis. Aliquam vel lacus efficitur, tincidunt leo interdum, luctus quam. Vestibulum maximus lobortis porta. Pellentesque ac nunc erat. Vivamus pulvinar convallis massa, sed cursus tortor dapibus a. Sed posuere urna id convallis fringilla. Phasellus ac diam pellentesque, dapibus libero a, tristique nibh.

Quisque a urna justo. Donec ut pretium arcu, vitae sollicitudin purus. In non risus hendrerit, malesuada nisi et, hendrerit mi. Quisque metus dui, convallis volutpat luctus sit amet, auctor a neque. Aliquam vitae fermentum felis. Proin sit amet ex ac sapien rutrum aliquet. Donec tincidunt ultrices est. Vestibulum in luctus tortor, sit amet dictum ipsum. Integer nulla diam, eleifend nec mollis tincidunt, pretium at enim. Maecenas tristique consequat lectus, a imperdiet tellus tincidunt non. Morbi id neque maximus, egestas tellus a, blandit quam. Cras mi est, lobortis non volutpat at, vulputate nec ligula.

In sit amet lobortis tortor. Proin faucibus lorem ligula, a consequat felis ullamcorper eu. Fusce eleifend accumsan mauris, eu ultricies odio commodo nec. Mauris in malesuada mi, at semper mi. Proin vestibulum tempor neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent vestibulum in massa vel pharetra. Suspendisse accumsan sem at efficitur fermentum. Duis dapibus consectetur malesuada. Donec auctor mollis leo eget imperdiet. Nullam dui est, posuere nec odio vel, commodo facilisis elit.

Etiam faucibus convallis tristique. Nunc eget odio ac sem vulputate facilisis cursus at eros. Aliquam accumsan tortor quis augue dictum lobortis. Praesent nec ultricies turpis, a placerat est. Nulla ac pretium elit, a vehicula enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus scelerisque, purus sit amet gravida ultricies, turpis lacus pretium magna, non dictum risus velit tincidunt erat. Praesent sollicitudin bibendum lobortis. Donec et felis vel sem lacinia gravida sed ut metus. Curabitur imperdiet accumsan turpis. Nam mollis sapien felis, a luctus lacus accumsan sed. Aenean facilisis vulputate purus, non tincidunt ex interdum id. Quisque imperdiet erat a turpis consequat eleifend.

Mauris condimentum ipsum massa, sit amet luctus nulla ornare et. Curabitur faucibus ipsum nibh, et ultrices ex lobortis ac. Suspendisse consectetur, tellus vitae rhoncus tincidunt, ex leo condimentum eros, id aliquam velit risus quis orci. Cras venenatis eleifend lacus ac maximus. Suspendisse placerat egestas ex vel suscipit. Aenean a tempus arcu, non blandit massa. Quisque non ligula ac lorem ornare bibendum ac in neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Proin imperdiet ipsum ut sodales dictum. Ut aliquet gravida justo vel condimentum. Fusce luctus quam vel sapien rutrum, ac semper est tempor. Nullam sed libero nulla. Nunc metus nulla, laoreet euismod ex ac, congue rutrum sem. Fusce id lobortis magna. Nullam ipsum augue, faucibus in lacinia quis, consectetur vitae purus. Cras a mi cursus, scelerisque magna a, lobortis dolor. Quisque id lorem nisi. Cras egestas dolor metus, ut luctus nunc mollis sed. Donec laoreet urna nec congue porta. Morbi in viverra tortor. Suspendisse vehicula ac ipsum viverra maximus.

Integer ut luctus lacus. Vestibulum eget bibendum mauris. Nam vehicula eros lorem. Sed semper lacinia elit a dapibus. Nulla id feugiat nulla. Mauris vestibulum magna at felis bibendum ultricies. Morbi libero massa, faucibus vitae aliquam et, gravida non ante. Aenean dictum gravida mauris ac fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi ultrices eu est pharetra egestas. Integer sollicitudin velit vel augue pretium efficitur. Phasellus id leo euismod, vulputate quam et, cursus risus. Nulla facilisi.

Aliquam erat volutpat. Vivamus felis nisi, facilisis lacinia porta vitae, vehicula ornare purus. Nulla porttitor lacus ac aliquet malesuada. Duis pellentesque dolor sit amet scelerisque feugiat. Vivamus semper sem massa, sit amet ultricies orci cursus in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur imperdiet eros et elit pharetra, et porttitor diam volutpat. Nam condimentum urna sapien, ut iaculis lorem facilisis at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris non purus molestie, porttitor est quis, tincidunt mauris. Pellentesque vehicula sem nec sollicitudin molestie. Proin scelerisque neque vel metus finibus, eu mattis sapien vulputate. Mauris rhoncus mauris eu libero dapibus auctor. Cras maximus mollis iaculis. Curabitur pellentesque vel justo quis blandit.
`;
