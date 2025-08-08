export const translations = {
  es: {
    common: {
      back: 'Volver',
      selectLanguage: 'Seleccionar idioma',
      cancel: 'Cancelar',
    },
    sidebar: {
        newChat: 'Nuevo chat',
        reports: 'Reportes',
        helpChannels: 'Canales de Ayuda',
        settings: 'Configuración',
        pastChats: 'Chats Anteriores',
        user: 'Usuario',
        openMenu: 'Abrir menú',
        menu: 'Menú',
    },
    chat: {
        newConversation: 'Nueva Conversación',
        placeholder: 'Comparte lo que tienes en mente...',
        sendMessage: 'Enviar mensaje',
        errorTitle: 'Ocurrió un error',
        errorDescription: 'No se pudo obtener una respuesta. Por favor, inténtalo de nuevo.',
        welcome: '¡Hola! Soy Simba, tu compañero de apoyo emocional. ¿Cómo te sientes hoy?',
        carelineTitle: 'El apoyo está disponible',
        carelineDescription: 'Parece que estás pasando por un momento difícil. Por favor, considera buscar apoyo.',
        carelineUniandes: 'Puedes contactar al <a href="https://cienciassociales.uniandes.edu.co/centro-de-atencion-psicologica/" target="_blank" rel="noopener noreferrer" class="font-semibold underline">Centro de Atención Psicológica de UNIANDES</a>.',
        carelineBogota: 'En Bogotá, para emergencias psicológicas puedes marcar la <strong>Línea 106</strong> ("El poder de ser escuchado"), disponible 24 horas. También puedes llamar al <strong>123</strong> para emergencias generales. Adicionalmente, la <strong>Línea Púrpura (018000112137)</strong> está disponible para mujeres que necesiten apoyo psicológico.'
    },
    settings: {
        title: 'Configuración',
        accessibility: {
            title: 'Accesibilidad y Preferencias',
            description: 'Personaliza la apariencia y el comportamiento de la aplicación para que se adapte a tus necesidades.',
        },
        darkMode: {
            label: 'Modo Noche',
            description: 'Activa un tema oscuro para reducir la fatiga visual.',
            ariaLabel: 'Activar modo noche',
        },
        fontSize: {
            label: 'Tamaño de Fuente',
            description: 'Ajusta el tamaño del texto para una mejor legibilidad.',
            small: 'Pequeño',
            normal: 'Normal',
            large: 'Grande',
        },
        dataManagement: {
            title: 'Gestión de Datos',
            description: 'Administra los datos de tus conversaciones guardadas en este navegador.',
        },
        clearHistory: {
            button: 'Eliminar historial de chats',
            confirmTitle: '¿Estás seguro?',
            confirmDescription: 'Esta acción no se puede deshacer. Se eliminarán permanentemente todas tus conversaciones de este navegador. La información no se podrá recuperar.',
            confirmButton: 'Sí, eliminar historial',
        }
    },
    reports: {
        title: 'Reportes de Interacción',
        cardTitle: 'Historial de Conversaciones',
        cardDescription: 'Selecciona una conversación para ver el reporte detallado generado por la IA.',
        noConversations: 'No hay conversaciones guardadas para generar reportes.',
        noConversationsHint: 'Inicia una conversación en la pantalla principal para verla aquí.',
        messagesCount: '{{count}} mensajes',
        viewReport: 'Ver Reporte'
    },
    report: {
        title: 'Reporte de Interacción',
        generating: 'Analizando la conversación y generando el reporte...',
        generatingHint: 'Esto puede tardar unos segundos.',
        generatingTitle: 'Generando Reporte...',
        reportFor: 'Reporte para:',
        description: 'Análisis detallado de la sesión de chat generado por IA.',
        generationFailed: 'No se pudo generar el reporte para esta conversación.',
        loadErrorTitle: 'Error al cargar la conversación',
        loadErrorDescription: 'No se pudo encontrar la conversación en el historial.',
        generationErrorTitle: 'Error al generar el reporte',
        generationErrorDescription: 'La IA no pudo procesar esta conversación. Por favor, inténtalo de nuevo.',
        generalInfo: {
            title: 'Información General',
            sessionId: 'ID de sesión',
            startTime: 'Fecha y hora de inicio',
            totalDuration: 'Duración total',
            initialContext: 'Contexto inicial',
            initialEmotions: 'Emociones iniciales',
        },
        emotionAnalysis: {
            primary: 'Análisis de Emoción Principal',
            secondary: 'Análisis de Emoción Secundaria',
            emotionType: 'Tipo de emoción',
            keywords: 'Palabras clave',
            intensity: 'Intensidad',
            appliedTechniques: 'Técnicas aplicadas',
        },
        summary: {
            title: 'Resumen y Cierre de la Conversación',
            conversationFlow: 'Flujo de la conversación',
            endEmotion: 'Emoción al final',
            finalRecommendations: 'Recomendaciones finales',
            actionTaken: 'Acción tomada',
        }
    },
    help: {
        title: 'Canales de Ayuda',
        cardTitle: 'Contactos de Ayuda y Emergencia',
        cardDescription: 'Si necesitas apoyo, no dudes en contactar con alguna de estas organizaciones. No estás solo/a.',
        uniandes: {
            name: 'Centro de Atención Psicológica de UNIANDES',
            description: 'Apoyo psicológico para la comunidad de la Universidad de los Andes.',
            action: 'Visitar sitio web',
        },
        line106: {
            name: 'Línea 106 "El poder de ser escuchado"',
            description: 'Línea de emergencia psicológica en Bogotá, disponible 24 horas.',
            action: 'Llamar a 106',
        },
        emergency: {
            name: 'Línea de Emergencias General',
            description: 'Para cualquier situación que requiera atención inmediata en Bogotá.',
            action: 'Llamar a 123',
        },
        purpleline: {
            name: 'Línea Púrpura',
            description: 'Apoyo psicológico para mujeres en Bogotá.',
            action: 'Llamar a 018000112137',
        }
    }
  },
  en: {
    common: {
      back: 'Back',
      selectLanguage: 'Select language',
      cancel: 'Cancel',
    },
    sidebar: {
        newChat: 'New Chat',
        reports: 'Reports',
        helpChannels: 'Help Channels',
        settings: 'Settings',
        pastChats: 'Past Chats',
        user: 'User',
        openMenu: 'Open menu',
        menu: 'Menu',
    },
    chat: {
        newConversation: 'New Conversation',
        placeholder: 'Share what is on your mind...',
        sendMessage: 'Send message',
        errorTitle: 'An error occurred',
        errorDescription: 'Could not get a response. Please try again.',
        welcome: 'Hello! I am Simba, your emotional support companion. How are you feeling today?',
        carelineTitle: 'Support is available',
        carelineDescription: 'It seems you are going through a difficult time. Please consider seeking support.',
        carelineUniandes: 'You can contact the <a href="https://cienciassociales.uniandes.edu.co/centro-de-atencion-psicologica/" target="_blank" rel="noopener noreferrer" class="font-semibold underline">UNIANDES Psychological Attention Center</a>.',
        carelineBogota: 'In Bogotá, for psychological emergencies you can dial <strong>Line 106</strong> ("The power of being heard"), available 24 hours. You can also call <strong>123</strong> for general emergencies. Additionally, the <strong>Purple Line (018000112137)</strong> is available for women who need psychological support.'
    },
    settings: {
        title: 'Settings',
        accessibility: {
            title: 'Accessibility & Preferences',
            description: 'Customize the appearance and behavior of the application to suit your needs.',
        },
        darkMode: {
            label: 'Dark Mode',
            description: 'Activate a dark theme to reduce eye strain.',
            ariaLabel: 'Activate dark mode',
        },
        fontSize: {
            label: 'Font Size',
            description: 'Adjust the text size for better readability.',
            small: 'Small',
            normal: 'Normal',
            large: 'Large',
        },
        dataManagement: {
            title: 'Data Management',
            description: 'Manage your conversation data saved in this browser.',
        },
        clearHistory: {
            button: 'Clear chat history',
            confirmTitle: 'Are you sure?',
            confirmDescription: 'This action cannot be undone. This will permanently delete all your conversations from this browser. The information cannot be recovered.',
            confirmButton: 'Yes, delete history',
        }
    },
    reports: {
        title: 'Interaction Reports',
        cardTitle: 'Conversation History',
        cardDescription: 'Select a conversation to see the detailed report generated by the AI.',
        noConversations: 'No saved conversations to generate reports.',
        noConversationsHint: 'Start a conversation on the main screen to see it here.',
        messagesCount: '{{count}} messages',
        viewReport: 'View Report'
    },
    report: {
        title: 'Interaction Report',
        generating: 'Analyzing conversation and generating report...',
        generatingHint: 'This may take a few seconds.',
        generatingTitle: 'Generating Report...',
        reportFor: 'Report for:',
        description: 'Detailed analysis of the chat session generated by AI.',
        generationFailed: 'Could not generate the report for this conversation.',
        loadErrorTitle: 'Error loading conversation',
        loadErrorDescription: 'Could not find the conversation in the history.',
        generationErrorTitle: 'Error generating report',
        generationErrorDescription: 'The AI could not process this conversation. Please try again.',
        generalInfo: {
            title: 'General Information',
            sessionId: 'Session ID',
            startTime: 'Start date and time',
            totalDuration: 'Total duration',
            initialContext: 'Initial context',
            initialEmotions: 'Initial emotions',
        },
        emotionAnalysis: {
            primary: 'Primary Emotion Analysis',
            secondary: 'Secondary Emotion Analysis',
            emotionType: 'Emotion type',
            keywords: 'Keywords',
            intensity: 'Intensity',
            appliedTechniques: 'Applied techniques',
        },
        summary: {
            title: 'Summary and Conversation Closure',
            conversationFlow: 'Conversation flow',
            endEmotion: 'End emotion',
            finalRecommendations: 'Final recommendations',
            actionTaken: 'Action taken',
        }
    },
    help: {
        title: 'Help Channels',
        cardTitle: 'Help and Emergency Contacts',
        cardDescription: 'If you need support, do not hesitate to contact one of these organizations. You are not alone.',
        uniandes: {
            name: 'UNIANDES Psychological Attention Center',
            description: 'Psychological support for the University of Los Andes community.',
            action: 'Visit website',
        },
        line106: {
            name: 'Line 106 "The power of being heard"',
            description: 'Psychological emergency line in Bogotá, available 24 hours.',
            action: 'Call 106',
        },
        emergency: {
            name: 'General Emergency Line',
            description: 'For any situation that requires immediate attention in Bogotá.',
            action: 'Call 123',
        },
        purpleline: {
            name: 'Purple Line',
            description: 'Psychological support for women in Bogotá.',
            action: 'Call 018000112137',
        }
    }
  },
  fr: {
    common: {
      back: 'Retour',
      selectLanguage: 'Sélectionner la langue',
      cancel: 'Annuler',
    },
    sidebar: {
        newChat: 'Nouveau chat',
        reports: 'Rapports',
        helpChannels: 'Canaux d\'aide',
        settings: 'Paramètres',
        pastChats: 'Anciens chats',
        user: 'Utilisateur',
        openMenu: 'Ouvrir le menu',
        menu: 'Menu',
    },
    chat: {
        newConversation: 'Nouvelle conversation',
        placeholder: 'Partagez ce que vous avez en tête...',
        sendMessage: 'Envoyer le message',
        errorTitle: 'Une erreur est survenue',
        errorDescription: 'Impossible d\'obtenir une réponse. Veuillez réessayer.',
        welcome: 'Bonjour! Je suis Simba, ton compagnon de soutien émotionnel. Comment te sens-tu aujourd\'hui?',
        carelineTitle: 'De l\'aide est disponible',
        carelineDescription: 'Il semble que vous traversiez une période difficile. Pensez à chercher du soutien.',
        carelineUniandes: 'Vous pouvez contacter le <a href="https://cienciassociales.uniandes.edu.co/centro-de-atencion-psicologica/" target="_blank" rel="noopener noreferrer" class="font-semibold underline">Centre d\'Attention Psychologique de l\'UNIANDES</a>.',
        carelineBogota: 'À Bogotá, pour les urgences psychologiques, vous pouvez composer la <strong>Ligne 106</strong> ("Le pouvoir d\'être écouté"), disponible 24 heures sur 24. Vous pouvez également appeler le <strong>123</strong> pour les urgences générales. De plus, la <strong>Ligne Pourpre (018000112137)</strong> est disponible pour les femmes ayant besoin de soutien psychologique.'
    },
    settings: {
        title: 'Paramètres',
        accessibility: {
            title: 'Accessibilité et Préférences',
            description: 'Personnalisez l\'apparence et le comportement de l\'application selon vos besoins.',
        },
        darkMode: {
            label: 'Mode sombre',
            description: 'Activez un thème sombre pour réduire la fatigue oculaire.',
            ariaLabel: 'Activer le mode sombre',
        },
        fontSize: {
            label: 'Taille de la police',
            description: 'Ajustez la taille du texte pour une meilleure lisibilité.',
            small: 'Petite',
            normal: 'Normale',
            large: 'Grande',
        },
        dataManagement: {
            title: 'Gestion des données',
            description: 'Gérez les données de vos conversations enregistrées dans ce navigateur.',
        },
        clearHistory: {
            button: 'Effacer l\'historique des chats',
            confirmTitle: 'Êtes-vous sûr(e) ?',
            confirmDescription: 'Cette action est irréversible. Toutes vos conversations seront définitivement supprimées de ce navigateur. Les informations ne pourront pas être récupérées.',
            confirmButton: 'Oui, supprimer l\'historique',
        }
    },
    reports: {
        title: 'Rapports d\'interaction',
        cardTitle: 'Historique des conversations',
        cardDescription: 'Sélectionnez une conversation pour voir le rapport détaillé généré par l\'IA.',
        noConversations: 'Aucune conversation enregistrée pour générer des rapports.',
        noConversationsHint: 'Commencez une conversation sur l\'écran principal pour la voir ici.',
        messagesCount: '{{count}} messages',
        viewReport: 'Voir le rapport'
    },
    report: {
        title: 'Rapport d\'interaction',
        generating: 'Analyse de la conversation et génération du rapport...',
        generatingHint: 'Cela peut prendre quelques secondes.',
        generatingTitle: 'Génération du rapport...',
        reportFor: 'Rapport pour :',
        description: 'Analyse détaillée de la session de chat générée par l\'IA.',
        generationFailed: 'Impossible de générer le rapport pour cette conversation.',
        loadErrorTitle: 'Erreur de chargement de la conversation',
        loadErrorDescription: 'Impossible de trouver la conversation dans l\'historique.',
        generationErrorTitle: 'Erreur de génération du rapport',
        generationErrorDescription: 'L\'IA n\'a pas pu traiter cette conversation. Veuillez réessayer.',
        generalInfo: {
            title: 'Informations générales',
            sessionId: 'ID de session',
            startTime: 'Date et heure de début',
            totalDuration: 'Durée totale',
            initialContext: 'Contexte initial',
            initialEmotions: 'Émotions initiales',
        },
        emotionAnalysis: {
            primary: 'Analyse de l\'émotion principale',
            secondary: 'Analyse de l\'émotion secondaire',
            emotionType: 'Type d\'émotion',
            keywords: 'Mots-clés',
            intensity: 'Intensité',
            appliedTechniques: 'Techniques appliquées',
        },
        summary: {
            title: 'Résumé et clôture de la conversation',
            conversationFlow: 'Déroulement de la conversation',
            endEmotion: 'Émotion finale',
            finalRecommendations: 'Recommandations finales',
            actionTaken: 'Action entreprise',
        }
    },
    help: {
        title: 'Canaux d\'aide',
        cardTitle: 'Contacts d\'aide et d\'urgence',
        cardDescription: 'Si vous avez besoin de soutien, n\'hésitez pas à contacter l\'une de ces organisations. Vous n\'êtes pas seul(e).',
        uniandes: {
            name: 'Centre d\'Attention Psychologique de l\'UNIANDES',
            description: 'Soutien psychologique pour la communauté de l\'Université des Andes.',
            action: 'Visiter le site web',
        },
        line106: {
            name: 'Ligne 106 "Le pouvoir d\'être écouté"',
            description: 'Ligne d\'urgence psychologique à Bogotá, disponible 24h/24.',
            action: 'Appeler le 106',
        },
        emergency: {
            name: 'Ligne d\'urgence générale',
            description: 'Pour toute situation nécessitant une attention immédiate à Bogotá.',
            action: 'Appeler le 123',
        },
        purpleline: {
            name: 'Ligne Pourpre',
            description: 'Soutien psychologique pour les femmes à Bogotá.',
            action: 'Appeler le 018000112137',
        }
    }
  },
  pt: {
    common: {
      back: 'Voltar',
      selectLanguage: 'Selecionar idioma',
      cancel: 'Cancelar',
    },
    sidebar: {
        newChat: 'Novo chat',
        reports: 'Relatórios',
        helpChannels: 'Canais de Ajuda',
        settings: 'Configurações',
        pastChats: 'Chats Anteriores',
        user: 'Usuário',
        openMenu: 'Abrir menu',
        menu: 'Menu',
    },
    chat: {
        newConversation: 'Nova Conversa',
        placeholder: 'Compartilhe o que está em sua mente...',
        sendMessage: 'Enviar mensagem',
        errorTitle: 'Ocorreu um erro',
        errorDescription: 'Não foi possível obter uma resposta. Por favor, tente novamente.',
        welcome: 'Olá! Eu sou o Simba, seu companheiro de apoio emocional. Como você está se sentindo hoje?',
        carelineTitle: 'O apoio está disponível',
        carelineDescription: 'Parece que você está passando por um momento difícil. Por favor, considere procurar apoio.',
        carelineUniandes: 'Você pode entrar em contato com o <a href="https://cienciassociales.uniandes.edu.co/centro-de-atencion-psicologica/" target="_blank" rel="noopener noreferrer" class="font-semibold underline">Centro de Atenção Psicológica da UNIANDES</a>.',
        carelineBogota: 'Em Bogotá, para emergências psicológicas, você pode ligar para a <strong>Linha 106</strong> ("O poder de ser ouvido"), disponível 24 horas. Você também pode ligar para o <strong>123</strong> para emergências gerais. Além disso, a <strong>Linha Púrpura (018000112137)</strong> está disponível para mulheres que precisam de apoio psicológico.'
    },
    settings: {
        title: 'Configurações',
        accessibility: {
            title: 'Acessibilidade e Preferências',
            description: 'Personalize a aparência e o comportamento do aplicativo para atender às suas necessidades.',
        },
        darkMode: {
            label: 'Modo Noturno',
            description: 'Ative um tema escuro para reduzir o cansaço visual.',
            ariaLabel: 'Ativar modo noturno',
        },
        fontSize: {
            label: 'Tamanho da Fonte',
            description: 'Ajuste o tamanho do texto para melhor legibilidade.',
            small: 'Pequeno',
            normal: 'Normal',
            large: 'Grande',
        },
        dataManagement: {
            title: 'Gerenciamento de Dados',
            description: 'Gerencie os dados de suas conversas salvos neste navegador.',
        },
        clearHistory: {
            button: 'Limpar histórico de chats',
            confirmTitle: 'Você tem certeza?',
            confirmDescription: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente todas as suas conversas deste navegador. As informações não poderão ser recuperadas.',
            confirmButton: 'Sim, limpar histórico',
        }
    },
    reports: {
        title: 'Relatórios de Interação',
        cardTitle: 'Histórico de Conversas',
        cardDescription: 'Selecione uma conversa para ver o relatório detalhado gerado pela IA.',
        noConversations: 'Nenhuma conversa salva para gerar relatórios.',
        noConversationsHint: 'Inicie uma conversa na tela principal para vê-la aqui.',
        messagesCount: '{{count}} mensagens',
        viewReport: 'Ver Relatório'
    },
    report: {
        title: 'Relatório de Interação',
        generating: 'Analisando a conversa e gerando o relatório...',
        generatingHint: 'Isso pode levar alguns segundos.',
        generatingTitle: 'Gerando Relatório...',
        reportFor: 'Relatório para:',
        description: 'Análise detalhada da sessão de chat gerada pela IA.',
        generationFailed: 'Não foi possível gerar o relatório para esta conversa.',
        loadErrorTitle: 'Erro ao carregar a conversa',
        loadErrorDescription: 'Não foi possível encontrar a conversa no histórico.',
        generationErrorTitle: 'Erro ao gerar o relatório',
        generationErrorDescription: 'A IA não conseguiu processar esta conversa. Por favor, tente novamente.',
        generalInfo: {
            title: 'Informações Gerais',
            sessionId: 'ID da sessão',
            startTime: 'Data e hora de início',
            totalDuration: 'Duração total',
            initialContext: 'Contexto inicial',
            initialEmotions: 'Emoções iniciais',
        },
        emotionAnalysis: {
            primary: 'Análise da Emoção Principal',
            secondary: 'Análise da Emoção Secundária',
            emotionType: 'Tipo de emoção',
            keywords: 'Palavras-chave',
            intensity: 'Intensidade',
            appliedTechniques: 'Técnicas aplicadas',
        },
        summary: {
            title: 'Resumo e Encerramento da Conversa',
            conversationFlow: 'Fluxo da conversa',
            endEmotion: 'Emoção final',
            finalRecommendations: 'Recomendações finais',
            actionTaken: 'Ação tomada',
        }
    },
    help: {
        title: 'Canais de Ajuda',
        cardTitle: 'Contatos de Ajuda e Emergência',
        cardDescription: 'Se precisar de apoio, não hesite em contatar uma destas organizações. Você não está sozinho(a).',
        uniandes: {
            name: 'Centro de Atenção Psicológica da UNIANDES',
            description: 'Apoio psicológico para a comunidade da Universidade dos Andes.',
            action: 'Visitar site',
        },
        line106: {
            name: 'Linha 106 "O poder de ser ouvido"',
            description: 'Linha de emergência psicológica em Bogotá, disponível 24 horas.',
            action: 'Ligar para 106',
        },
        emergency: {
            name: 'Linha de Emergência Geral',
            description: 'Para qualquer situação que exija atenção imediata em Bogotá.',
            action: 'Ligar para 123',
        },
        purpleline: {
            name: 'Linha Púrpura',
            description: 'Apoio psicológico para mulheres em Bogotá.',
            action: 'Ligar para 018000112137',
        }
    }
  },
  zh: {
    common: {
      back: '返回',
      selectLanguage: '选择语言',
      cancel: '取消',
    },
    sidebar: {
        newChat: '新聊天',
        reports: '报告',
        helpChannels: '帮助渠道',
        settings: '设置',
        pastChats: '过去的聊天',
        user: '用户',
        openMenu: '打开菜单',
        menu: '菜单',
    },
    chat: {
        newConversation: '新对话',
        placeholder: '分享你的想法...',
        sendMessage: '发送消息',
        errorTitle: '发生错误',
        errorDescription: '无法获取回应。请再试一次。',
        welcome: '你好！我是辛巴，你的情感支持伙伴。你今天感觉怎么样？',
        carelineTitle: '可以获得支持',
        carelineDescription: '看来你正经历困难时期。请考虑寻求支持。',
        carelineUniandes: '你可以联系 <a href="https://cienciassociales.uniandes.edu.co/centro-de-atencion-psicologica/" target="_blank" rel="noopener noreferrer" class="font-semibold underline">UNIANDES心理关注中心</a>。',
        carelineBogota: '在波哥大，心理紧急情况可以拨打<strong>106号线</strong>（“被倾听的力量”），24小时可用。你也可以拨打<strong>123</strong>寻求一般紧急情况。此外，<strong>紫线（018000112137）</strong>为需要心理支持的女性提供服务。'
    },
    settings: {
        title: '设置',
        accessibility: {
            title: '辅助功能和偏好',
            description: '自定义应用程序的外观和行为以满足您的需求。',
        },
        darkMode: {
            label: '夜间模式',
            description: '激活深色主题以减少眼睛疲劳。',
            ariaLabel: '激活夜间模式',
        },
        fontSize: {
            label: '字体大小',
            description: '调整文本大小以获得更好的可读性。',
            small: '小',
            normal: '正常',
            large: '大',
        },
        dataManagement: {
            title: '数据管理',
            description: '管理此浏览器中保存的对话数据。',
        },
        clearHistory: {
            button: '清除聊天记录',
            confirmTitle: '你确定吗？',
            confirmDescription: '此操作无法撤销。这将从此浏览器中永久删除您的所有对话。信息将无法恢复。',
            confirmButton: '是的，删除历史记录',
        }
    },
    reports: {
        title: '互动报告',
        cardTitle: '对话历史',
        cardDescription: '选择一个对话以查看由AI生成的详细报告。',
        noConversations: '没有保存的对话来生成报告。',
        noConversationsHint: '在主屏幕上开始对话以在此处查看。',
        messagesCount: '{{count}} 条消息',
        viewReport: '查看报告'
    },
    report: {
        title: '互动报告',
        generating: '正在分析对话并生成报告...',
        generatingHint: '这可能需要几秒钟。',
        generatingTitle: '正在生成报告...',
        reportFor: '报告对象：',
        description: '由AI生成的聊天会话的详细分析。',
        generationFailed: '无法为此对话生成报告。',
        loadErrorTitle: '加载对话时出错',
        loadErrorDescription: '在历史记录中找不到对话。',
        generationErrorTitle: '生成报告时出错',
        generationErrorDescription: 'AI无法处理此对话。请再试一次。',
        generalInfo: {
            title: '一般信息',
            sessionId: '会话ID',
            startTime: '开始日期和时间',
            totalDuration: '总持续时间',
            initialContext: '初始背景',
            initialEmotions: '初始情绪',
        },
        emotionAnalysis: {
            primary: '主要情绪分析',
            secondary: '次要情绪分析',
            emotionType: '情绪类型',
            keywords: '关键词',
            intensity: '强度',
            appliedTechniques: '应用技术',
        },
        summary: {
            title: '摘要和对话结束',
            conversationFlow: '对话流程',
            endEmotion: '结束情绪',
            finalRecommendations: '最终建议',
            actionTaken: '采取的行动',
        }
    },
    help: {
        title: '帮助渠道',
        cardTitle: '帮助和紧急联系人',
        cardDescription: '如果您需要支持，请不要犹豫与这些组织之一联系。您并不孤单。',
        uniandes: {
            name: 'UNIANDES心理关注中心',
            description: '为安第斯大学社区提供心理支持。',
            action: '访问网站',
        },
        line106: {
            name: '106号线“被倾听的力量”',
            description: '波哥大心理紧急热线，24小时可用。',
            action: '拨打106',
        },
        emergency: {
            name: '一般紧急热线',
            description: '适用于波哥大任何需要立即关注的情况。',
            action: '拨打123',
        },
        purpleline: {
            name: '紫线',
            description: '为波哥大女性提供心理支持。',
            action: '拨打018000112137',
        }
    }
  },
};

type NestedObject = { [key: string]: string | NestedObject };
type Path<T> = T extends string ? [] : {
    [K in keyof T]: [K, ...Path<T[K]>]
}[keyof T];
type Join<T extends (string | number)[], D extends string> =
    T extends [] ? never :
    T extends [infer F] ? F :
    T extends [infer F, ...infer R] ? F extends string ? `${F}${D}${Join<Extract<R, (string|number)[]>, D>}` : never : never;

type TranslationKeys<T> = Join<Path<T>, '.'>;

export type TranslationKey = TranslationKeys<typeof translations.en>;

export function getWelcomeMessage(language: string): string {
    const lang = language as keyof typeof translations;
    if (translations[lang] && translations[lang].chat) {
      return translations[lang].chat.welcome;
    }
    return translations.en.chat.welcome; // Fallback to English
}

export function getCareLineMessage(t: (key: TranslationKey) => string) {
    return {
        title: t('chat.carelineTitle'),
        description: t('chat.carelineDescription'),
        uniandes: t('chat.carelineUniandes'),
        bogota: t('chat.carelineBogota'),
    }
}
