/* ─────────────────────────────────────────────────────────────────────────────
   RetailSense AI · app.js  —  Full SPA logic (Landing + Dashboard + Prediction)
───────────────────────────────────────────────────────────────────────────── */
"use strict";

/* ═══════════════════════════════════════════════════════════════════════════
   TRANSLATIONS
═══════════════════════════════════════════════════════════════════════════ */
const translations = {
  ar: {
    dir: 'rtl', label: 'العربية',
    /* ── Header nav ──────────────────────────────────── */
    'nav_home':     'الرئيسية',
    'nav_dashboard':'لوحة التحكم',
    'nav_upload':   'رفع البيانات',
    'nav_analysis': 'التحليل',
    'nav_prediction':'التنبؤ',
    'nav_reports':  'التقارير',
    /* ── Landing page ───────────────────────────────── */
    'nav-home':     'الرئيسية',
    'nav-how':      'كيف نعمل',
    'nav-features': 'المميزات',
    'nav-insights': 'تحليلات',
    'nav-login':    'تسجيل الدخول',
    'nav-cta':      'ابدأ الآن',
    'hero-badge':   'مستقبل البيع بالتجزئة الذكي',
    'hero-title':   'افهم عملك، وتوقع مستقبلك',
    'hero-desc':    'نحول بيانات مبيعاتك المعقدة إلى قصص واضحة وتوقعات ذكية تساعدك على اتخاذ قرارات أفضل.',
    'hero-cta-primary': 'ابدأ الآن',
    'hero-cta-secondary': 'مشاهدة تجريبية',
    'hero-social':  'انضم إلى +500 متجر ناجح',
    'kpi-label':    'نمو المبيعات',
    'how-title':    'كيف نعمل؟',
    'how-subtitle': 'ثلاث خطوات بسيطة تحول متجرك التقليدي إلى واحة من البيانات الذكية والقرارات المدروسة.',
    'step1-title':  'نجمع البيانات',
    'step1-desc':   'نقوم بربط أنظمة المبيعات والمخزون الحالية لجمع كافة التفاصيل الهامة لعملك.',
    'step2-title':  'نفهم ما حدث',
    'step2-desc':   'يحلل الذكاء الاصطناعي الأنماط التاريخية لمبيعاتك ليفهم سلوك العملاء الحقيقي.',
    'step3-title':  'نتوقع القادم',
    'step3-desc':   'نقدم لك توقعات دقيقة للطلبات القادمة والمخزون، لتخطط بذكاء وتتجنب المفاجآت.',
    'benefits-title':    'لماذا يختارنا الرواد؟',
    'benefits-subtitle': 'استثمر في ذكاء عملك لضمان الريادة في السوق.',
    'benefits-cta':      'تحدث مع خبير',
    'feat1-badge': 'ميزة ذكية',
    'feat1-title': 'قرارات أسرع بمراحل',
    'feat1-desc':  'بدلاً من قضاء ساعات في تحليل الجداول المعقدة، نقدم لك لوحة تحكم فورية تبرز لك الفرص والمخاطر بنظرة واحدة.',
    'feat2-title': 'تخطيط أفضل للمستقبل',
    'feat2-desc':  'اعرف ما سيباع قبل حدوثه. قلل الهدر في المخزون وارفع أرباحك من خلال التنبؤ الدقيق بالطلب.',
    'cta-box-title':       'هل أنت مستعد لقيادة ثورة البيانات في متجرك؟',
    'cta-box-desc':        'انضم إلى مئات الشركات التي حولت قراراتها من "تخمين" إلى "يقين".',
    'cta-box-btn-primary': 'ابدأ مع لوحة التحكم',
    'cta-box-btn-secondary': 'رفع البيانات',
    'footer-about':   'الجيل القادم من تحليلات التجزئة المدعومة بالذكاء الاصطناعي لمستقبل أكثر إشراقاً.',
    'footer-product': 'المنتج',
    'footer-pricing': 'الأسعار',
    'footer-support': 'الدعم',
    'footer-help':    'مركز المساعدة',
    'footer-contact': 'اتصل بنا',
    'footer-copy':    '© 2024 RetailSense AI. جميع الحقوق محفوظة.',
    /* ── Dashboard ──────────────────────────────────── */
    'dash_hero_title':    'لوحة مبيعات التجزئة بالذكاء الاصطناعي',
    'dash_hero_subtitle': 'تحليل بيانات المبيعات، اكتشاف الرؤى التجارية، والتنبؤ بالمبيعات.',
    'btn_run_ai':         'تشغيل تحليل الذكاء الاصطناعي',
    'hero_box_title':     'ما الذي تفعله هذه المنصة؟',
    'hero_box_desc':      'يعالج محرك الذكاء الاصطناعي بيانات التجزئة الخاصة بك باستمرار لتحديد الاتجاهات الخفية والتنبؤ باحتياجات المخزون.',
    'kpi_orders':   'إجمالي الطلبات',
    'kpi_sales':    'إجمالي المبيعات',
    'kpi_aov':      'متوسط قيمة الطلب',
    'kpi_category': 'الفئة الأعلى',
    'kpi_region':   'المنطقة الأعلى',
    'kpi_product':  'أفضل منتج',
    'chart_cat_title':   'المبيعات حسب الفئة',
    'chart_reg_title':   'المبيعات حسب المنطقة',
    'chart_trend_title': 'اتجاه المبيعات الشهري',
    'products_title':    'أفضل المنتجات',
    'kpi_vs_week':       'مقارنة بالأسبوع الماضي',
    'kpi_top_of_sales':  '42% من إجمالي المبيعات',
    'kpi_growing_fast':  'نمو متسارع',
    'kpi_best_seller':   'الأكثر مبيعاً',
    'currency_symbol':   '₪',
    /* ── Upload ─────────────────────────────────────── */
    'upload_title':    'رفع بيانات المبيعات',
    'upload_subtitle': 'ارفع ملف CSV يحتوي على بيانات معاملاتك التجارية.',
    'upload_drop':     'اسحب وأفلت ملف CSV هنا',
    'upload_or':       'أو اضغط للاختيار',
    'upload_btn':      'اختر ملفاً',
    'upload_sample':   'تحميل ملف نموذجي',
    'upload_req_title':'الأعمدة المطلوبة',
    'upload_req_cols': 'Order ID, Order Date, Customer Name, Category, Region, Product Name, Quantity, Unit Price, Discount, Customer Segment, Payment Method, Total Sales',
    /* ── Analysis ───────────────────────────────────── */
    'analysis_title':    'تشغيل تحليل الذكاء الاصطناعي',
    'analysis_subtitle': 'ستقوم وكلاء الذكاء الاصطناعي بتحليل بياناتك وإنشاء الرؤى وتدريب نموذج التنبؤ.',
    'analysis_btn':     'تشغيل التحليل',
    'analysis_running': 'جارٍ التحليل… الرجاء الانتظار (قد يستغرق عدة دقائق)',
    'analysis_success': 'اكتمل التحليل بنجاح!',
    'analysis_error':   'فشل التحليل. يرجى المحاولة مجدداً.',
    'step1_title': 'تحليل البيانات',       'step1_desc': 'يستكشف الذكاء الاصطناعي بياناتك ويكتشف الأنماط',
    'step2_title': 'توليد الرؤى',          'step2_desc': 'يتم إنشاء رؤى ومقترحات الأعمال',
    'step3_title': 'تدريب النموذج',        'step3_desc': 'يتم تدريب نموذج Random Forest للتوقع',
    'step4_title': 'إنشاء التقارير',       'step4_desc': 'يتم إنتاج تقارير التقييم وبطاقات النماذج',
    /* ── Prediction (legacy keys kept for compatibility) */
    'pred_title':    'توقع المبيعات',
    'pred_subtitle': 'أدخل تفاصيل المعاملة للحصول على تقدير قيمة المبيعات.',
    'pred_btn':      'توقع المبيعات',
    'pred_busy':     'جارٍ التوقع…',
    'pred_result_label': 'المبيعات المتوقعة',
    'pred_result_note':  'توقع نموذج Random Forest',
    'lbl_category': 'الفئة', 'lbl_region': 'المنطقة', 'lbl_segment': 'شريحة العميل',
    'lbl_payment': 'طريقة الدفع', 'lbl_price': 'السعر (₪)', 'lbl_qty': 'الكمية', 'lbl_discount': 'الخصم',
    /* ── Prediction NEW (Stitch-design) ─────────────── */
    'pred_badge_ml':        'مدعوم بتعلم الآلة',
    'pred_badge_ready':     'النموذج جاهز',
    'pred_page_title':      'توقع المبيعات بالذكاء الاصطناعي',
    'pred_page_desc':       'أدخل تفاصيل الطلب للحصول على تقدير ذكي لقيمة المبيعات باستخدام نموذج تعلم آلي.',
    'pred_form_title':      'بيانات التنبؤ',
    'pred_lbl_categories':  'الفئات',
    'pred_select_all':      'اختيار الكل',
    'pred_cat_electronics': 'الإلكترونيات',
    'pred_cat_fashion':     'الأزياء',
    'pred_cat_furniture':   'الأثاث',
    'pred_cat_home':        'المنزل',
    'pred_lbl_regions':     'المناطق',
    'pred_reg_east':        'الشرقية',
    'pred_reg_north':       'الشمالية',
    'pred_reg_south':       'الجنوبية',
    'pred_reg_west':        'الغربية',
    'pred_lbl_segments':    'شرائح العملاء',
    'pred_seg_new':         'جديد',
    'pred_seg_premium':     'مميز',
    'pred_seg_regular':     'عادي',
    'pred_lbl_payments':    'طرق الدفع',
    'pred_pay_card':        'بطاقة ائتمان',
    'pred_pay_cash':        'نقدي',
    'pred_pay_online':      'دفع إلكتروني',
    'pred_btn_analyze':     'تنبؤ بالمبيعات',
    'pred_btn_busy':        'جارٍ التحليل...',
    'pred_result_title':    'نتيجة التنبؤ',
    'pred_accuracy':        'دقة: —',
    'pred_result_desc':     'أدخل التفاصيل وانقر على زر التنبؤ',
    'pred_conf_label':      'توزيع الثقة',
    'pred_status_label':    'الحالة:',
    'pred_status_ready':    'النموذج جاهز',
    'pred_insights_title':  'رؤى الذكاء الاصطناعي',
    'pred_ins1_title':      'تأثير السعر',
    'pred_ins1_desc':       'تقليل السعر بنسبة 5% قد يزيد حجم المبيعات بنسبة 12% في هذه المنطقة.',
    'pred_ins2_title':      'سلوك العملاء',
    'pred_ins2_desc':       'العملاء المميزون يفضلون الدفع ببطاقة الائتمان بنسبة تفوق 80%.',
    'pred_ins3_title':      'توقع الطلب',
    'pred_ins3_desc':       'من المتوقع ارتفاع الطلب في الأسبوع القادم بسبب العوامل الموسمية.',
    'pred_trends_title':    'تحليلات اتجاهات السوق',
    'pred_sensitivity_title': 'تحليل حساسية السعر',
    'pred_regional_title':  'مساهمة المناطق',
    'pred_sensitivity_note':'يوضح المخطط العلاقة العكسية بين السعر وحجم المبيعات المتوقع.',
    'pred_filter_monthly':  'شهري',
    'pred_filter_weekly':   'أسبوعي',
    'pred_how_title':       'كيف يعمل النظام؟',
    'pred_how_step1_title': 'إدخال التفاصيل',
    'pred_how_step1_desc':  'قم بتعبئة بيانات المنتج والمنطقة وشريحة العملاء بدقة.',
    'pred_how_step2_title': 'إرسال للتحليل',
    'pred_how_step2_desc':  'يتم تحليل المدخلات عبر نموذج Random Forest في ثوانٍ.',
    'pred_how_step3_title': 'عرض النتيجة',
    'pred_how_step3_desc':  'احصل على تقدير مالي دقيق مع مؤشر الثقة.',
    'pred_chart_price':     'السعر',
    'pred_chart_volume':    'حجم الطلب',
    /* ── Reports ────────────────────────────────────── */
    'reports_title':         'تقارير الذكاء الاصطناعي',
    'reports_subtitle':      'التقارير والنتائج التحليلية المولدة بالذكاء الاصطناعي.',
    'reports_empty':         'لا توجد تقارير بعد. شغّل التحليل لإنشاء التقارير.',
    'reports_not_available': 'لم يتم إنشاؤه بعد',
    'rep_insights_title': 'رؤى الأعمال',       'rep_insights_desc': 'رؤى الأعمال المولدة بالذكاء الاصطناعي من بياناتك.',
    'rep_eval_title':     'تقرير التقييم',      'rep_eval_desc': 'دقة النموذج، RMSE، R² ومقاييس الأداء.',
    'rep_card_title':     'بطاقة النموذج',      'rep_card_desc': 'وصف النموذج والميزات والقيود.',
    'rep_eda_title':      'تقرير EDA',           'rep_eda_desc': 'تحليل البيانات الاستكشافي للمجموعة الخام.',
    'rep_download':       'تحميل',
    'rep_open_eda':       'فتح تقرير EDA',
    /* ── Common ─────────────────────────────────────── */
    'no_data':       'لا توجد بيانات. ارفع ملف CSV وشغّل التحليل أولاً.',
    'loading':       'جارٍ التحميل…',
    'error_prefix':  'خطأ',
    'success_prefix':'نجاح',
    /* ── Upload messages ────────────────────────────────── */
    'upload_uploading':     '⏳ جارٍ الرفع…',
    'upload_success_msg':   'تم الرفع بنجاح',
    'upload_rows_label':    'سطر',
    'upload_csv_only':      'الرجاء رفع ملف .csv فقط',
    'upload_network_error': 'خطأ في الشبكة أثناء الرفع',
    /* ── Upload/Analysis panel ─────────────────────── */
    'file_ready':            'الملف جاهز',
    'file_remove':           'إزالة',
    'file_rows':             'سطر',
    'btn_run_analysis':      'تشغيل تحليل الذكاء الاصطناعي',
    'analysis_step1':        'قراءة البيانات',
    'analysis_step2':        'تنظيف البيانات',
    'analysis_step3':        'توليد الرؤى',
    'analysis_step4':        'تدريب النموذج',
    'analysis_step5':        'إنشاء التقارير',
    'analysis_complete':     'اكتمل التحليل بنجاح!',
    'analysis_complete_desc':'بياناتك جاهزة. يمكنك الآن استعراض الرؤى والتنبؤات.',
    'btn_view_insights':     'عرض الرؤى',
    'btn_view_predictions':  'التنبؤ بالمبيعات',
    'btn_clear_restart':     'مسح والبدء من جديد',
    'analysis_failed':       'فشل التحليل',
    'btn_retry':             'إعادة المحاولة',
    /* ── Prediction validation ──────────────────────────── */
    'pred_select_category': 'الرجاء اختيار فئة واحدة على الأقل',
    'pred_select_region':   'الرجاء اختيار منطقة واحدة على الأقل',
    'pred_select_segment':  'الرجاء اختيار شريحة عميل واحدة على الأقل',
    'pred_select_payment':  'الرجاء اختيار طريقة دفع واحدة على الأقل',
    'pred_valid_price':     'الرجاء إدخال سعر صحيح',
    'pred_valid_quantity':  'الرجاء إدخال كمية صحيحة',
    'pred_fail':            'فشل التوقع. شغّل التحليل أولاً.',
    'network_error':        'خطأ في الشبكة',
    'analysis_network_error': 'خطأ في الشبكة أثناء التحليل',
    'pred_network_error':   'خطأ في الشبكة أثناء التوقع',
    'rep_total_label':      'الإجمالي',
    'chart_yaxis_label':    'المبيعات (ألف)',
    'pred_placeholder_price': 'أدخل السعر',
    'pred_placeholder_qty':   'الكمية',
    'pred_placeholder_disc':  'مثال: 0.10 للخصم 10%',
    /* ── AI Data Agent ──────────────────────────────── */
    'nav_agent':             'وكيل البيانات الذكي',
    'agent_badge':           'مدعوم بـ OpenAI',
    'agent_title':           'وكيل البيانات الذكي',
    'agent_desc':            'اسأل عن بياناتك بلغتك الطبيعية — سيقرأ الوكيل ملف CSV الذي رفعته ويجيب على أسئلتك.',
    'agent_no_dataset':      'ارفع ملف CSV أولًا حتى تستطيع التحدث مع بياناتك.',
    'agent_placeholder':     'اسأل عن بياناتك…',
    'agent_send':            'إرسال',
    'agent_thinking':        'الوكيل يفكر…',
    'agent_clear':           'مسح المحادثة',
    'agent_new_csv_notice':  'تم رفع ملف CSV جديد. ابدأ محادثة جديدة حول الملف الأخير.',
    'agent_dataset_changed': 'تم تغيير البيانات. ابدأ محادثة جديدة مع الملف الأخير الذي تم رفعه.',
    'agent_indexing':        'البيانات لا تزال تُفهرس. يرجى الانتظار لحظة والمحاولة مجدداً.',
    'agent_error':           'عذرًا، لم يتمكن وكيل الذكاء الاصطناعي من الإجابة الآن. حاول مرة أخرى.',
    'agent_you':             'أنت',
    'agent_assistant':       'الوكيل',
    'agent_sq1': 'لخّص بيانات المبيعات',
    'agent_sq2': 'ما هو أفضل منتج؟',
    'agent_sq3': 'أي منطقة حققت أعلى مبيعات؟',
    'agent_sq4': 'أي تصنيف حقق أعلى إيرادات؟',
    'agent_sq5': 'ما الاتجاه الذي تراه في البيانات؟',
  },

  en: {
    dir: 'ltr', label: 'English',
    /* ── Header nav ──────────────────────────────────── */
    'nav_home':     'Home',
    'nav_dashboard':'Dashboard',
    'nav_upload':   'Upload Data',
    'nav_analysis': 'Run Analysis',
    'nav_prediction':'Prediction',
    'nav_reports':  'Reports',
    /* ── Landing page ───────────────────────────────── */
    'nav-home':     'Home',
    'nav-how':      'How it Works',
    'nav-features': 'Features',
    'nav-insights': 'Analytics',
    'nav-login':    'Log In',
    'nav-cta':      'Get Started',
    'hero-badge':   'The Future of Smart Retail',
    'hero-title':   'Understand your customers, and predict your future',
    'hero-desc':    'We turn complex sales data into clear narratives and smart predictions that help you make better decisions.',
    'hero-cta-primary': 'Get Started',
    'hero-cta-secondary': 'Watch Demo',
    'hero-social':  'Join 500+ successful stores',
    'kpi-label':    'Sales Growth',
    'how-title':    'How it Works?',
    'how-subtitle': 'Three simple steps to transform your traditional store into a hub of smart data and informed decisions.',
    'step1-title':  'Data Collection',
    'step1-desc':   'We connect to your existing sales and inventory systems to collect every critical detail of your business.',
    'step2-title':  'Understand What Happened',
    'step2-desc':   'AI analyzes historical patterns of your sales to understand real customer behavior.',
    'step3-title':  'Predict the Future',
    'step3-desc':   'We provide accurate forecasts for upcoming orders and inventory, helping you plan smart and avoid surprises.',
    'benefits-title':    'Why Leaders Choose Us?',
    'benefits-subtitle': 'Invest in your business intelligence to ensure market leadership.',
    'benefits-cta':      'Talk to an Expert',
    'feat1-badge': 'Smart Feature',
    'feat1-title': 'Faster Decisions',
    'feat1-desc':  'Instead of spending hours analyzing complex tables, we give you an instant dashboard highlighting opportunities.',
    'feat2-title': 'Better Future Planning',
    'feat2-desc':  'Know what will sell before it happens. Reduce inventory waste and increase profits through accurate demand forecasting.',
    'cta-box-title':       'Ready to lead the data revolution in your store?',
    'cta-box-desc':        'Join hundreds of companies that shifted their decisions from "guessing" to "certainty".',
    'cta-box-btn-primary': 'Open Dashboard',
    'cta-box-btn-secondary': 'Upload Data',
    'footer-about':   'The next generation of retail analytics powered by AI for a brighter future.',
    'footer-product': 'Product',
    'footer-pricing': 'Pricing',
    'footer-support': 'Support',
    'footer-help':    'Help Center',
    'footer-contact': 'Contact Us',
    'footer-copy':    '© 2024 RetailSense AI. All rights reserved.',
    /* ── Dashboard ──────────────────────────────────── */
    'dash_hero_title':    'Retail Sales AI Dashboard',
    'dash_hero_subtitle': 'Analyze sales data, discover business insights, and predict expected sales.',
    'btn_run_ai':         'Run AI Analysis',
    'hero_box_title':     'What does this do?',
    'hero_box_desc':      'Our AI engine processes your retail data to identify hidden trends, forecast inventory needs, and optimize pricing strategies.',
    'kpi_orders':   'Total Orders',
    'kpi_sales':    'Total Sales',
    'kpi_aov':      'Avg Order Value',
    'kpi_category': 'Top Category',
    'kpi_region':   'Top Region',
    'kpi_product':  'Best Product',
    'chart_cat_title':   'Sales by Category',
    'chart_reg_title':   'Sales by Region',
    'chart_trend_title': 'Monthly Sales Trend',
    'products_title':    'Top Products',
    'kpi_vs_week':       'vs last week',
    'kpi_top_of_sales':  '42% of total sales',
    'kpi_growing_fast':  'Growing fast',
    'kpi_best_seller':   'Best seller',
    'currency_symbol':   '$',
    /* ── Upload ─────────────────────────────────────── */
    'upload_title':    'Upload Sales Data',
    'upload_subtitle': 'Upload a CSV file containing your retail transaction data.',
    'upload_drop':     'Drag & drop your CSV file here',
    'upload_or':       'or click to browse',
    'upload_btn':      'Choose File',
    'upload_sample':   'Download Sample File',
    'upload_req_title':'Required columns',
    'upload_req_cols': 'Order ID, Order Date, Customer Name, Category, Region, Product Name, Quantity, Unit Price, Discount, Customer Segment, Payment Method, Total Sales',
    /* ── Analysis ───────────────────────────────────── */
    'analysis_title':    'Run AI Analysis',
    'analysis_subtitle': 'AI agents will analyze your data, generate insights, and train a prediction model.',
    'analysis_btn':     'Run AI Analysis',
    'analysis_running': 'Running analysis… please wait (may take a few minutes)',
    'analysis_success': 'Analysis completed successfully!',
    'analysis_error':   'Analysis failed. Please try again.',
    'step1_title': 'Data Analysis',   'step1_desc': 'AI agents explore your data and discover patterns',
    'step2_title': 'Insight Gen.',    'step2_desc': 'Business insights and recommendations are generated',
    'step3_title': 'Model Training',  'step3_desc': 'A Random Forest model is trained to predict sales',
    'step4_title': 'Report Gen.',     'step4_desc': 'Evaluation reports and model cards are produced',
    /* ── Prediction (legacy) */
    'pred_title':    'Sales Prediction',
    'pred_subtitle': 'Enter transaction details to get an estimated sales value.',
    'pred_btn':      'Predict Sales',
    'pred_busy':     'Predicting…',
    'pred_result_label': 'Estimated Sales',
    'pred_result_note':  'Random Forest model prediction',
    'lbl_category': 'Category', 'lbl_region': 'Region', 'lbl_segment': 'Customer Segment',
    'lbl_payment': 'Payment Method', 'lbl_price': 'Price ($)', 'lbl_qty': 'Quantity', 'lbl_discount': 'Discount',
    /* ── Prediction NEW ─────────────────────────────── */
    'pred_badge_ml':        'ML Powered',
    'pred_badge_ready':     'Model Ready',
    'pred_page_title':      'AI Sales Prediction',
    'pred_page_desc':       'Enter order details to get an intelligent estimate of sales value using a machine learning model.',
    'pred_form_title':      'Prediction Data',
    'pred_lbl_categories':  'Categories',
    'pred_select_all':      'Select All',
    'pred_cat_electronics': 'Electronics',
    'pred_cat_fashion':     'Fashion',
    'pred_cat_furniture':   'Furniture',
    'pred_cat_home':        'Home',
    'pred_lbl_regions':     'Regions',
    'pred_reg_east':        'East',
    'pred_reg_north':       'North',
    'pred_reg_south':       'South',
    'pred_reg_west':        'West',
    'pred_lbl_segments':    'Customer Segments',
    'pred_seg_new':         'New',
    'pred_seg_premium':     'Premium',
    'pred_seg_regular':     'Regular',
    'pred_lbl_payments':    'Payment Methods',
    'pred_pay_card':        'Credit Card',
    'pred_pay_cash':        'Cash',
    'pred_pay_online':      'Online',
    'pred_btn_analyze':     'Predict Sales',
    'pred_btn_busy':        'Analyzing...',
    'pred_result_title':    'Prediction Result',
    'pred_accuracy':        'Accuracy: —',
    'pred_result_desc':     'Enter details and click Predict',
    'pred_conf_label':      'Confidence Spread',
    'pred_status_label':    'Status:',
    'pred_status_ready':    'Model Ready',
    'pred_insights_title':  'AI Insights',
    'pred_ins1_title':      'Price Impact',
    'pred_ins1_desc':       'Reducing price by 5% could increase sales volume by 12% in this region.',
    'pred_ins2_title':      'Customer Behavior',
    'pred_ins2_desc':       'Premium customers prefer credit card payments over 80% of the time.',
    'pred_ins3_title':      'Demand Forecast',
    'pred_ins3_desc':       'Peak demand expected next week due to seasonal factors.',
    'pred_trends_title':    'Market Trends Analytics',
    'pred_sensitivity_title': 'Price Sensitivity Analysis',
    'pred_regional_title':  'Regional Contribution',
    'pred_sensitivity_note':'This chart shows the inverse relationship between price and predicted sales volume.',
    'pred_filter_monthly':  'Monthly',
    'pred_filter_weekly':   'Weekly',
    'pred_how_title':       'How It Works',
    'pred_how_step1_title': 'Enter Details',
    'pred_how_step1_desc':  'Fill in product, region, and customer segment data accurately.',
    'pred_how_step2_title': 'Submit for Analysis',
    'pred_how_step2_desc':  'Inputs are analyzed via Random Forest model in seconds.',
    'pred_how_step3_title': 'View Result',
    'pred_how_step3_desc':  'Get an accurate financial estimate with a confidence indicator.',
    'pred_chart_price':     'Price',
    'pred_chart_volume':    'Order Volume',
    /* ── Reports ────────────────────────────────────── */
    'reports_title':         'AI Reports',
    'reports_subtitle':      'AI-generated reports and analysis artifacts.',
    'reports_empty':         'No reports yet. Run analysis to generate reports.',
    'reports_not_available': 'Not generated yet',
    'rep_insights_title': 'Business Insights',    'rep_insights_desc': 'AI-generated business insights from your sales data.',
    'rep_eval_title':     'Evaluation Report',    'rep_eval_desc': 'Model accuracy, RMSE, R² and performance metrics.',
    'rep_card_title':     'Model Card',           'rep_card_desc': 'Model description, features, and limitations.',
    'rep_eda_title':      'EDA Report',           'rep_eda_desc': 'Exploratory Data Analysis of the raw dataset.',
    'rep_download':       'Download',
    'rep_open_eda':       'Open EDA Report',
    /* ── Common ─────────────────────────────────────── */
    'no_data':       'No data available. Upload a CSV and run analysis first.',
    'loading':       'Loading…',
    'error_prefix':  'Error',
    'success_prefix':'Success',
    /* ── Upload messages ────────────────────────────────── */
    'upload_uploading':     '⏳ Uploading…',
    'upload_success_msg':   'Uploaded successfully',
    'upload_rows_label':    'rows',
    'upload_csv_only':      'Please upload a .csv file only',
    'upload_network_error': 'Network error during upload',
    /* ── Upload/Analysis panel ─────────────────────── */
    'file_ready':            'File Ready',
    'file_remove':           'Remove',
    'file_rows':             'rows',
    'btn_run_analysis':      'Run AI Analysis',
    'analysis_step1':        'Reading data',
    'analysis_step2':        'Cleaning data',
    'analysis_step3':        'Generating insights',
    'analysis_step4':        'Training model',
    'analysis_step5':        'Creating reports',
    'analysis_complete':     'Analysis complete!',
    'analysis_complete_desc':'Your data is ready. View insights and start making predictions.',
    'btn_view_insights':     'View Insights',
    'btn_view_predictions':  'Predict Sales',
    'btn_clear_restart':     'Clear & start over',
    'analysis_failed':       'Analysis failed',
    'btn_retry':             'Retry',
    /* ── Prediction validation ──────────────────────────── */
    'pred_select_category': 'Please select at least one category',
    'pred_select_region':   'Please select at least one region',
    'pred_select_segment':  'Please select at least one customer segment',
    'pred_select_payment':  'Please select at least one payment method',
    'pred_valid_price':     'Please enter a valid price',
    'pred_valid_quantity':  'Please enter a valid quantity',
    'pred_fail':            'Prediction failed. Run analysis first.',
    'network_error':        'Network error',
    'analysis_network_error': 'Network error during analysis',
    'pred_network_error':   'Network error during prediction',
    'rep_total_label':      'Total',
    'chart_yaxis_label':    'Sales (k)',
    'pred_placeholder_price': 'Enter price',
    'pred_placeholder_qty':   'Quantity',
    'pred_placeholder_disc':  'e.g. 0.10 for 10% discount',
    /* ── AI Data Agent ──────────────────────────────── */
    'nav_agent':             'AI Data Agent',
    'agent_badge':           'Powered by OpenAI',
    'agent_title':           'AI Data Agent',
    'agent_desc':            'Ask questions about your data in plain language — the agent reads your uploaded CSV and answers from it.',
    'agent_no_dataset':      'Upload a CSV file first to chat with your data.',
    'agent_placeholder':     'Ask about your data…',
    'agent_send':            'Send',
    'agent_thinking':        'Agent is thinking…',
    'agent_clear':           'Clear chat',
    'agent_new_csv_notice':  'New CSV uploaded. Start a new chat about the latest file.',
    'agent_dataset_changed': 'The dataset has changed. Please start a new chat with the latest uploaded file.',
    'agent_indexing':        'The data is still being indexed. Please wait a moment and try again.',
    'agent_error':           'Sorry, the AI agent could not answer right now. Please try again.',
    'agent_you':             'You',
    'agent_assistant':       'Agent',
    'agent_sq1': 'Summarize my sales data',
    'agent_sq2': 'What is the top product?',
    'agent_sq3': 'Which region has the highest sales?',
    'agent_sq4': 'Which category generated the most revenue?',
    'agent_sq5': 'What trend do you see in the data?',
  },

  he: {
    dir: 'rtl', label: 'עברית',
    /* ── Header nav ──────────────────────────────────── */
    'nav_home':     'בית',
    'nav_dashboard':'לוח בקרה',
    'nav_upload':   'העלאת נתונים',
    'nav_analysis': 'הפעל ניתוח',
    'nav_prediction':'חיזוי',
    'nav_reports':  'דוחות',
    /* ── Landing page ───────────────────────────────── */
    'nav-home':     'בית',
    'nav-how':      'איך זה עובד',
    'nav-features': 'מאפיינים',
    'nav-insights': 'אנליטיקה',
    'nav-login':    'התחברות',
    'nav-cta':      'התחל עכשיו',
    'hero-badge':   'העתיד של קמעונאות חכמה',
    'hero-title':   'הבן את הלקוחות שלך וחזה את העתיד',
    'hero-desc':    'אנו הופכים נתוני מכירות מורכבים לסיפורים ברורים ותחזיות חכמות שעוזרות לך לקבל החלטות טובות יותר.',
    'hero-cta-primary': 'התחל עכשיו',
    'hero-cta-secondary': 'צפה בהדגמה',
    'hero-social':  'הצטרף ל-500+ חנויות מצליחות',
    'kpi-label':    'צמיחה במכירות',
    'how-title':    'איך זה עובד?',
    'how-subtitle': 'שלושה צעדים פשוטים להפוך את החנות המסורתית שלך למרכז נתונים חכם.',
    'step1-title':  'איסוף נתונים',
    'step1-desc':   'אנו מתחברים למערכות המכירות והמלאי הקיימות שלך כדי לאסוף כל פרט קריטי.',
    'step2-title':  'הבנת העבר',
    'step2-desc':   'בינה מלאכותית מנתחת דפוסי מכירות היסטוריים להבנת התנהגות לקוחות.',
    'step3-title':  'חיזוי העתיד',
    'step3-desc':   'אנו מספקים תחזיות מדויקות להזמנות ולמלאי, עוזרים לך לתכנן חכם ולמנוע הפתעות.',
    'benefits-title':    'למה מובילים בוחרים בנו?',
    'benefits-subtitle': 'השקיעו בבינה עסקית כדי להבטיח הובלה בשוק.',
    'benefits-cta':      'דבר עם מומחה',
    'feat1-badge': 'תכונה חכמה',
    'feat1-title': 'החלטות מהירות יותר',
    'feat1-desc':  'במקום לבזבז שעות על טבלאות מורכבות, אנו מספקים לוח בקרה מיידי המדגיש הזדמנויות.',
    'feat2-title': 'תכנון עתידי טוב יותר',
    'feat2-desc':  'דע מה יימכר לפני שזה קורה. צמצם בזבוז במלאי והגדל רווחים.',
    'cta-box-title':       'מוכן להוביל את מהפכת הנתונים בחנות שלך?',
    'cta-box-desc':        'הצטרף למאות חברות שהפכו את ההחלטות שלהן מ"ניחוש" ל"וודאות".',
    'cta-box-btn-primary': 'פתח לוח בקרה',
    'cta-box-btn-secondary': 'העלה נתונים',
    'footer-about':   'הדור הבא של אנליטיקה קמעונאית מבוססת AI לעתיד בהיר יותר.',
    'footer-product': 'מוצר',
    'footer-pricing': 'מחירים',
    'footer-support': 'תמיכה',
    'footer-help':    'מרכז עזרה',
    'footer-contact': 'צור קשר',
    'footer-copy':    '© 2024 RetailSense AI. כל הזכויות שמורות.',
    /* ── Dashboard ──────────────────────────────────── */
    'dash_hero_title':    'לוח בקרה למכירות קמעונאיות בבינה מלאכותית',
    'dash_hero_subtitle': 'ניתוח נתוני מכירות, גילוי תובנות עסקיות וחיזוי מכירות.',
    'btn_run_ai':         'הפעל ניתוח AI',
    'hero_box_title':     'מה זה עושה?',
    'hero_box_desc':      'מנוע ה-AI שלנו מעבד ברציפות את הנתונים הקמעונאיים שלך כדי לזהות מגמות נסתרות ולחזות צרכי מלאי.',
    'kpi_orders':   'סה"כ הזמנות',
    'kpi_sales':    'סה"כ מכירות',
    'kpi_aov':      'ערך הזמנה ממוצע',
    'kpi_category': 'קטגוריה מובילה',
    'kpi_region':   'אזור מוביל',
    'kpi_product':  'מוצר מוביל',
    'chart_cat_title':   'מכירות לפי קטגוריה',
    'chart_reg_title':   'מכירות לפי אזור',
    'chart_trend_title': 'מגמת מכירות חודשית',
    'products_title':    'מוצרים מובילים',
    'kpi_vs_week':       'לעומת השבוע שעבר',
    'kpi_top_of_sales':  '42% מסה"כ מכירות',
    'kpi_growing_fast':  'צמיחה מהירה',
    'kpi_best_seller':   'הנמכר ביותר',
    'currency_symbol':   '₪',
    /* ── Upload ─────────────────────────────────────── */
    'upload_title':    'העלאת נתוני מכירות',
    'upload_subtitle': 'העלה קובץ CSV עם נתוני עסקאות הקמעונאות שלך.',
    'upload_drop':     'גרור ושחרר את קובץ ה-CSV כאן',
    'upload_or':       'או לחץ לבחירה',
    'upload_btn':      'בחר קובץ',
    'upload_sample':   'הורד קובץ לדוגמה',
    'upload_req_title':'עמודות נדרשות',
    'upload_req_cols': 'Order ID, Order Date, Customer Name, Category, Region, Product Name, Quantity, Unit Price, Discount, Customer Segment, Payment Method, Total Sales',
    /* ── Analysis ───────────────────────────────────── */
    'analysis_title':    'הפעל ניתוח AI',
    'analysis_subtitle': 'סוכני AI ינתחו את הנתונים שלך, יייצרו תובנות ויאמנו מודל חיזוי.',
    'analysis_btn':     'הפעל ניתוח',
    'analysis_running': 'מנתח… אנא המתן (עשוי לקחת כמה דקות)',
    'analysis_success': 'הניתוח הושלם בהצלחה!',
    'analysis_error':   'הניתוח נכשל. אנא נסה שוב.',
    'step1_title': 'ניתוח נתונים',   'step1_desc': 'סוכני AI חוקרים את הנתונים שלך ומגלים דפוסים',
    'step2_title': 'יצירת תובנות',   'step2_desc': 'תובנות עסקיות והמלצות נוצרות',
    'step3_title': 'אימון מודל',      'step3_desc': 'מודל Random Forest מאומן לחיזוי מכירות עתידיות',
    'step4_title': 'יצירת דוחות',    'step4_desc': 'דוחות הערכה ובטאי מודל נוצרים',
    /* ── Prediction (legacy) */
    'pred_title':    'חיזוי מכירות',
    'pred_subtitle': 'הזן פרטי עסקה לקבלת הערכת ערך המכירות.',
    'pred_btn':      'חזה מכירות',
    'pred_busy':     'מחשב…',
    'pred_result_label': 'מכירות משוערות',
    'pred_result_note':  'תחזית מודל Random Forest',
    'lbl_category': 'קטגוריה', 'lbl_region': 'אזור', 'lbl_segment': 'פלח לקוח',
    'lbl_payment': 'שיטת תשלום', 'lbl_price': 'מחיר (₪)', 'lbl_qty': 'כמות', 'lbl_discount': 'הנחה',
    /* ── Prediction NEW ─────────────────────────────── */
    'pred_badge_ml':        'מבוסס למידת מכונה',
    'pred_badge_ready':     'מודל מוכן',
    'pred_page_title':      'חיזוי מכירות AI',
    'pred_page_desc':       'הזן פרטי הזמנה לקבלת הערכת ערך מכירות חכמה באמצעות מודל למידת מכונה.',
    'pred_form_title':      'נתוני חיזוי',
    'pred_lbl_categories':  'קטגוריות',
    'pred_select_all':      'בחר הכל',
    'pred_cat_electronics': 'אלקטרוניקה',
    'pred_cat_fashion':     'אופנה',
    'pred_cat_furniture':   'ריהוט',
    'pred_cat_home':        'בית',
    'pred_lbl_regions':     'אזורים',
    'pred_reg_east':        'מזרח',
    'pred_reg_north':       'צפון',
    'pred_reg_south':       'דרום',
    'pred_reg_west':        'מערב',
    'pred_lbl_segments':    'פלחי לקוחות',
    'pred_seg_new':         'חדש',
    'pred_seg_premium':     'פרימיום',
    'pred_seg_regular':     'רגיל',
    'pred_lbl_payments':    'שיטות תשלום',
    'pred_pay_card':        'כרטיס אשראי',
    'pred_pay_cash':        'מזומן',
    'pred_pay_online':      'תשלום אלקטרוני',
    'pred_btn_analyze':     'חזה מכירות',
    'pred_btn_busy':        'מחשב...',
    'pred_result_title':    'תוצאת חיזוי',
    'pred_accuracy':        'דיוק: —',
    'pred_result_desc':     'הזן פרטים ולחץ על חזה',
    'pred_conf_label':      'פריסת ביטחון',
    'pred_status_label':    'סטטוס:',
    'pred_status_ready':    'מודל מוכן',
    'pred_insights_title':  'תובנות AI',
    'pred_ins1_title':      'השפעת מחיר',
    'pred_ins1_desc':       'הפחתת המחיר ב-5% עשויה להגדיל את נפח המכירות ב-12% באזור זה.',
    'pred_ins2_title':      'התנהגות לקוחות',
    'pred_ins2_desc':       'לקוחות פרימיום מעדיפים תשלום בכרטיס אשראי ביותר מ-80% מהמקרים.',
    'pred_ins3_title':      'תחזית ביקוש',
    'pred_ins3_desc':       'שיא ביקוש צפוי בשבוע הבא עקב גורמים עונתיים.',
    'pred_trends_title':    'ניתוח מגמות שוק',
    'pred_sensitivity_title': 'ניתוח רגישות מחיר',
    'pred_regional_title':  'תרומה אזורית',
    'pred_sensitivity_note':'תרשים זה מציג את הקשר ההפוך בין המחיר לנפח המכירות החזוי.',
    'pred_filter_monthly':  'חודשי',
    'pred_filter_weekly':   'שבועי',
    'pred_how_title':       'איך זה עובד',
    'pred_how_step1_title': 'הזן פרטים',
    'pred_how_step1_desc':  'מלא פרטי מוצר, אזור ופלח לקוח בדיוק.',
    'pred_how_step2_title': 'שלח לניתוח',
    'pred_how_step2_desc':  'הקלטים מנותחים דרך מודל Random Forest תוך שניות.',
    'pred_how_step3_title': 'צפה בתוצאה',
    'pred_how_step3_desc':  'קבל הערכה פיננסית מדויקת עם מדד ביטחון.',
    'pred_chart_price':     'מחיר',
    'pred_chart_volume':    'נפח הזמנה',
    /* ── Reports ────────────────────────────────────── */
    'reports_title':         'דוחות AI',
    'reports_subtitle':      'דוחות וממצאי ניתוח שנוצרו על ידי בינה מלאכותית.',
    'reports_empty':         'אין דוחות עדיין. הפעל ניתוח ליצירת דוחות.',
    'reports_not_available': 'טרם נוצר',
    'rep_insights_title': 'תובנות עסקיות',   'rep_insights_desc': 'תובנות שנוצרו על ידי AI מנתוני המכירות שלך.',
    'rep_eval_title':     'דוח הערכה',        'rep_eval_desc': 'דיוק המודל, RMSE, R² ומדדי ביצועים.',
    'rep_card_title':     'כרטיס מודל',       'rep_card_desc': 'תיאור המודל, תכונות ומגבלות.',
    'rep_eda_title':      'דוח EDA',           'rep_eda_desc': 'ניתוח נתונים אקספלורטורי של מערך הנתונים הגולמי.',
    'rep_download':       'הורד',
    'rep_open_eda':       'פתח דוח EDA',
    /* ── Common ─────────────────────────────────────── */
    'no_data':       'אין נתונים זמינים. העלה קובץ CSV והפעל ניתוח תחילה.',
    'loading':       'טוען…',
    'error_prefix':  'שגיאה',
    'success_prefix':'הצלחה',
    /* ── Upload messages ────────────────────────────────── */
    'upload_uploading':     '⏳ מעלה…',
    'upload_success_msg':   'הועלה בהצלחה',
    'upload_rows_label':    'שורות',
    'upload_csv_only':      'אנא העלה קובץ .csv בלבד',
    'upload_network_error': 'שגיאת רשת בעת ההעלאה',
    /* ── Upload/Analysis panel ─────────────────────── */
    'file_ready':            'הקובץ מוכן',
    'file_remove':           'הסר',
    'file_rows':             'שורות',
    'btn_run_analysis':      'הפעל ניתוח AI',
    'analysis_step1':        'קריאת נתונים',
    'analysis_step2':        'ניקוי נתונים',
    'analysis_step3':        'יצירת תובנות',
    'analysis_step4':        'אימון מודל',
    'analysis_step5':        'יצירת דוחות',
    'analysis_complete':     'הניתוח הושלם!',
    'analysis_complete_desc':'הנתונים מוכנים. כעת תוכל לצפות בתובנות ותחזיות.',
    'btn_view_insights':     'צפה בתובנות',
    'btn_view_predictions':  'חזה מכירות',
    'btn_clear_restart':     'נקה והתחל מחדש',
    'analysis_failed':       'הניתוח נכשל',
    'btn_retry':             'נסה שוב',
    /* ── Prediction validation ──────────────────────────── */
    'pred_select_category': 'אנא בחר לפחות קטגוריה אחת',
    'pred_select_region':   'אנא בחר לפחות אזור אחד',
    'pred_select_segment':  'אנא בחר לפחות פלח לקוח אחד',
    'pred_select_payment':  'אנא בחר לפחות שיטת תשלום אחת',
    'pred_valid_price':     'אנא הזן מחיר תקין',
    'pred_valid_quantity':  'אנא הזן כמות תקינה',
    'pred_fail':            'החיזוי נכשל. הפעל ניתוח תחילה.',
    'network_error':        'שגיאת רשת',
    'analysis_network_error': 'שגיאת רשת בעת הניתוח',
    'pred_network_error':   'שגיאת רשת בעת החיזוי',
    'rep_total_label':      'סה"כ',
    'chart_yaxis_label':    'מכירות (אלף)',
    'pred_placeholder_price': 'הזן מחיר',
    'pred_placeholder_qty':   'כמות',
    'pred_placeholder_disc':  'לדוגמה: 0.10 להנחה של 10%',
    /* ── AI Data Agent ──────────────────────────────── */
    'nav_agent':             'סוכן נתונים חכם',
    'agent_badge':           'מופעל על ידי OpenAI',
    'agent_title':           'סוכן נתונים חכם',
    'agent_desc':            'שאל שאלות על הנתונים שלך בשפה טבעית — הסוכן קורא את קובץ ה-CSV שהעלית ועונה מתוכו.',
    'agent_no_dataset':      'העלה קובץ CSV קודם כדי לשוחח עם הנתונים שלך.',
    'agent_placeholder':     'שאל על הנתונים שלך…',
    'agent_send':            'שלח',
    'agent_thinking':        'הסוכן חושב…',
    'agent_clear':           'נקה שיחה',
    'agent_new_csv_notice':  'הועלה קובץ CSV חדש. התחל שיחה חדשה על הקובץ האחרון.',
    'agent_dataset_changed': 'הנתונים השתנו. התחל שיחה חדשה עם הקובץ האחרון שהועלה.',
    'agent_indexing':        'הנתונים עדיין נסרקים. אנא המתן רגע ונסה שוב.',
    'agent_error':           'מצטער, סוכן ה-AI לא הצליח לענות כרגע. נסה שוב.',
    'agent_you':             'אתה',
    'agent_assistant':       'סוכן',
    'agent_sq1': 'סכם את נתוני המכירות',
    'agent_sq2': 'מה המוצר המוביל?',
    'agent_sq3': 'איזה אזור מכר הכי הרבה?',
    'agent_sq4': 'איזו קטגוריה הביאה הכי הרבה הכנסות?',
    'agent_sq5': 'איזו מגמה רואים בנתונים?',
  }
};

/* ═══════════════════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════════════════ */
let currentLang = 'ar';
let dynamicTranslations = {};
let cachedDashboardData = null;
let predictionOptions = null;
let predictionInsights = null;
const chartInstances = {};
const predChartInstances = {};

/* ── Upload/Analysis state ── */
let uploadedFileInfo  = null;   // { name, size, rows }
let analysisStatus    = 'idle'; // 'idle' | 'running' | 'success' | 'error'
let analysisProgress  = 0;      // 0-100
let currentAnalysisStep = 0;    // 0-4 (index into steps array)
let analysisProgressTimer = null;
let analysisErrorMsg  = '';

/* ── Dataset identity ── */
let activeDatasetId          = null; // assigned on every successful upload
let lastAnalyzedDatasetId    = null; // assigned on every successful analysis
let cachedDashboardDatasetId = null; // which dataset cachedDashboardData belongs to
let predictionOptionsDatasetId  = null;
let predictionInsightsDatasetId = null;

/* ── AI Data Agent state ── */
let agentMessages           = [];   // { role: 'user'|'assistant', content: string }[]
let agentConversationHistory = [];  // sent to backend for multi-turn context
let agentIsLoading          = false;

/* ── Prediction result ── */
let predictionResult    = null;  // { raw, value } | null
let hasPredictionResult = false; // true only after a real /api/predict success

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════════════ */
function t(key) {
  return (translations[currentLang] || {})[key] || key;
}

/* Dynamic value translation — keys are lowercase English */
const VALUE_TRANSLATIONS = {
  /* categories */
  'electronics':       { ar: 'الإلكترونيات',   he: 'אלקטרוניקה',       en: 'Electronics'       },
  'furniture':         { ar: 'الأثاث',          he: 'ריהוט',             en: 'Furniture'         },
  'clothing':          { ar: 'الملابس',         he: 'ביגוד',             en: 'Clothing'          },
  'groceries':         { ar: 'البقالة',         he: 'מצרכים',            en: 'Groceries'         },
  'beauty':            { ar: 'الجمال',          he: 'טיפוח',             en: 'Beauty'            },
  'fashion':           { ar: 'الأزياء',         he: 'אופנה',             en: 'Fashion'           },
  'home':              { ar: 'المنزل',          he: 'בית',               en: 'Home'              },
  /* regions */
  'east':              { ar: 'الشرقية',         he: 'מזרח',              en: 'East'              },
  'west':              { ar: 'الغربية',         he: 'מערב',              en: 'West'              },
  'north':             { ar: 'الشمالية',        he: 'צפון',              en: 'North'             },
  'south':             { ar: 'الجنوبية',        he: 'דרום',              en: 'South'             },
  'jerusalem':         { ar: 'القدس',           he: 'ירושלים',           en: 'Jerusalem'         },
  'tel aviv':          { ar: 'تل أبيب',         he: 'תל אביב',           en: 'Tel Aviv'          },
  'haifa':             { ar: 'حيفا',            he: 'חיפה',              en: 'Haifa'             },
  'nazareth':          { ar: 'الناصرة',         he: 'נצרת',              en: 'Nazareth'          },
  'beer sheva':        { ar: 'بئر السبع',       he: 'באר שבע',           en: 'Beer Sheva'        },
  /* customer segments */
  'new':               { ar: 'جديد',            he: 'חדש',               en: 'New'               },
  'premium':           { ar: 'مميز',            he: 'פרימיום',           en: 'Premium'           },
  'regular':           { ar: 'عادي',            he: 'רגיל',              en: 'Regular'           },
  'retail':            { ar: 'تجزئة',           he: 'קמעונאות',          en: 'Retail'            },
  'corporate':         { ar: 'شركات',           he: 'עסקי',              en: 'Corporate'         },
  'vip':               { ar: 'مميز خاص',        he: 'VIP',               en: 'VIP'               },
  'student':           { ar: 'طالب',            he: 'סטודנט',            en: 'Student'           },
  /* payment methods */
  'credit card':       { ar: 'بطاقة ائتمان',    he: 'כרטיס אשראי',      en: 'Credit Card'       },
  'card':              { ar: 'بطاقة ائتمان',    he: 'כרטיס אשראי',      en: 'Card'              },
  'cash':              { ar: 'نقدًا',           he: 'מזומן',             en: 'Cash'              },
  'online':            { ar: 'دفع إلكتروني',    he: 'תשלום אלקטרוני',   en: 'Online'            },
  'paypal':            { ar: 'باي بال',         he: 'PayPal',            en: 'PayPal'            },
  'bank transfer':     { ar: 'تحويل بنكي',      he: 'העברה בנקאית',     en: 'Bank Transfer'     },
  'apple pay':         { ar: 'Apple Pay',       he: 'Apple Pay',         en: 'Apple Pay'         },
  /* products — generate_and_train.py sample */
  'laptop':            { ar: 'لابتوب',          he: 'מחשב נייד',         en: 'Laptop'            },
  'phone':             { ar: 'هاتف',            he: 'טלפון',             en: 'Phone'             },
  'headphones':        { ar: 'سماعات',          he: 'אוזניות',           en: 'Headphones'        },
  'shoes':             { ar: 'أحذية',           he: 'נעליים',            en: 'Shoes'             },
  'jacket':            { ar: 'جاكيت',          he: 'ז׳קט',              en: 'Jacket'            },
  'desk':              { ar: 'مكتب',            he: 'שולחן',             en: 'Desk'              },
  'chair':             { ar: 'كرسي',            he: 'כיסא',              en: 'Chair'             },
  'coffee maker':      { ar: 'آلة قهوة',        he: 'מכונת קפה',         en: 'Coffee Maker'      },
  /* products — user test CSV */
  'office chair':      { ar: 'كرسي مكتب',       he: 'כיסא משרדי',        en: 'Office Chair'      },
  'study desk':        { ar: 'مكتب دراسة',      he: 'שולחן לימוד',       en: 'Study Desk'        },
  'bookshelf':         { ar: 'مكتبة',           he: 'כוננית ספרים',      en: 'Bookshelf'         },
  'desk lamp':         { ar: 'مصباح مكتب',      he: 'מנורת שולחן',       en: 'Desk Lamp'         },
  'storage cabinet':   { ar: 'خزانة تخزين',     he: 'ארון אחסון',        en: 'Storage Cabinet'   },
  'wireless mouse':    { ar: 'فأرة لاسلكية',    he: 'עכבר אלחוטי',       en: 'Wireless Mouse'    },
  'bluetooth speaker': { ar: 'سماعة بلوتوث',    he: "רמקול בלוטות'",    en: 'Bluetooth Speaker' },
  'laptop stand':      { ar: 'حامل لابتوب',     he: 'מעמד למחשב נייד',   en: 'Laptop Stand'      },
  'usb-c hub':         { ar: 'موزع USB-C',      he: 'מפצל USB-C',        en: 'USB-C Hub'         },
  'keyboard':          { ar: 'لوحة مفاتيح',     he: 'מקלדת',             en: 'Keyboard'          },
  't-shirt':           { ar: 'قميص',            he: 'חולצה',             en: 'T-Shirt'           },
  'jeans':             { ar: 'جينز',            he: "ג'ינס",             en: 'Jeans'             },
  'sneakers':          { ar: 'حذاء رياضي',      he: 'נעלי ספורט',        en: 'Sneakers'          },
  'cap':               { ar: 'قبعة',            he: 'כובע',              en: 'Cap'               },
  'coffee beans':      { ar: 'حبوب قهوة',       he: 'פולי קפה',          en: 'Coffee Beans'      },
  'olive oil':         { ar: 'زيت زيتون',       he: 'שמן זית',           en: 'Olive Oil'         },
  'pasta pack':        { ar: 'عبوة معكرونة',    he: 'חבילת פסטה',        en: 'Pasta Pack'        },
  'rice bag':          { ar: 'كيس أرز',         he: 'שק אורז',           en: 'Rice Bag'          },
  'chocolate box':     { ar: 'علبة شوكولاتة',   he: 'קופסת שוקולד',      en: 'Chocolate Box'     },
  'face cream':        { ar: 'كريم وجه',        he: 'קרם פנים',          en: 'Face Cream'        },
  'shampoo':           { ar: 'شامبو',           he: 'שמפו',              en: 'Shampoo'           },
  'perfume':           { ar: 'عطر',             he: 'בושם',              en: 'Perfume'           },
  'body lotion':       { ar: 'لوشن للجسم',      he: 'קרם גוף',           en: 'Body Lotion'       },
  'hair gel':          { ar: 'جل شعر',          he: "ג'ל לשיער",         en: 'Hair Gel'          },
};

/* Translate a raw data value coming from the CSV/backend.
   Priority: 1) dynamic translations from dataset  2) static VALUE_TRANSLATIONS */
function tv(val) {
  if (!val || typeof val !== 'string') return String(val ?? '');
  const key = val.trim();
  // 1. Dynamic (dataset-specific, generated after each workflow run)
  const dynEntry = dynamicTranslations[key] || dynamicTranslations[key.toLowerCase()];
  if (dynEntry && dynEntry[currentLang]) return dynEntry[currentLang];
  // 2. Static fallback
  const entry = VALUE_TRANSLATIONS[key.toLowerCase()];
  if (entry) return entry[currentLang] || entry.en || val;
  return val;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FORMATTERS  — always en-US digits regardless of UI language
═══════════════════════════════════════════════════════════════════════════ */
function formatNumber(value) {
  if (value == null || isNaN(Number(value))) return '—';
  return Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function formatCurrency(value) {
  const sym = t('currency_symbol');
  if (value == null || isNaN(Number(value))) return sym + '—';
  return sym + Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  });
}

function formatPercent(value) {
  if (value == null || isNaN(Number(value))) return '—';
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 1, maximumFractionDigits: 1,
  }) + '%';
}

function formatDate(value) {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch { return String(value); }
}

function $(id) { return document.getElementById(id); }

function setInner(id, html) {
  const el = $(id);
  if (el) el.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════════════════════ */
function showToast(msg, type = 'info') {
  const container = $('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.25s, transform 0.25s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(6px)';
    setTimeout(() => toast.remove(), 280);
  }, 3500);
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════════════════ */
function navigate(section) {
  document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
  const target = $('section-' + section);
  if (target) target.classList.add('active');

  document.querySelectorAll('[data-nav]').forEach(b => b.classList.remove('active'));
  const navBtn = document.querySelector(`[data-nav="${section}"]`);
  if (navBtn) navBtn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  $('lang-dropdown')?.classList.remove('active');

  if (section === 'dashboard') {
    const needsFresh = !cachedDashboardData || cachedDashboardDatasetId !== activeDatasetId;
    loadDashboard(needsFresh);
  }
  if (section === 'prediction') {
    const needsOptFresh = !predictionOptions || predictionOptionsDatasetId !== activeDatasetId;
    const needsInsFresh = !predictionInsights || predictionInsightsDatasetId !== activeDatasetId;
    loadPredictionOptions(needsOptFresh);
    loadPredictionInsights(needsInsFresh);
  }
  if (section === 'agent') {
    renderAgentPage();
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   LANGUAGE
═══════════════════════════════════════════════════════════════════════════ */
function setLanguage(lang) {
  const data = translations[lang];
  if (!data) return;
  currentLang = lang;
  try { localStorage.setItem('retailsense_lang', lang); } catch {}

  document.documentElement.dir  = data.dir;
  document.documentElement.lang = lang;
  document.body.dir = data.dir;

  const labelEl = $('current-lang-label');
  if (labelEl) labelEl.textContent = data.label;

  /* Font family */
  const fonts = {
    ar: "'Noto Kufi Arabic','Inter',sans-serif",
    he: "'Noto Sans Hebrew','Inter',sans-serif",
    en: "'Inter','Plus Jakarta Sans',sans-serif",
  };
  document.body.style.fontFamily = fonts[lang] || fonts.en;

  /* Update all data-key and data-i18n text nodes */
  document.querySelectorAll('[data-key]').forEach(el => {
    const val = data[el.getAttribute('data-key')];
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = data[el.getAttribute('data-i18n')];
    if (val !== undefined) el.textContent = val;
  });

  /* Translate placeholder attributes */
  document.querySelectorAll('[data-placeholder-key]').forEach(el => {
    const val = data[el.getAttribute('data-placeholder-key')];
    if (val !== undefined) el.placeholder = val;
  });

  /* Translate data-key-placeholder attributes (agent input uses this) */
  document.querySelectorAll('[data-key-placeholder]').forEach(el => {
    const val = data[el.getAttribute('data-key-placeholder')];
    if (val !== undefined) el.placeholder = val;
  });

  /* Close dropdown */
  $('lang-dropdown')?.classList.remove('active');

  /* Landing page RTL/LTR layout tweaks */
  const isRtl = data.dir === 'rtl';
  const heroContent   = document.querySelector('.hero-content');
  const benefitsTitle = document.querySelector('.benefits-title-group');
  const footerCols    = document.querySelectorAll('.footer-col');
  const icons         = document.querySelectorAll('.icon-flip');
  const avatarGroup   = document.querySelector('.avatar-group');
  const benefitsHdr   = document.querySelector('.benefits-header');

  if (isRtl) {
    document.body.classList.remove('text-left');
    heroContent?.classList.replace('text-left', 'text-right');
    benefitsTitle?.classList.replace('text-left', 'text-right');
    footerCols.forEach(c => c.classList.replace('text-left', 'text-right'));
    avatarGroup?.classList.add('space-x-reverse');
    benefitsHdr?.classList.replace('md:flex-row-reverse', 'md:flex-row');
    icons.forEach(i => i.style.transform = 'rotate(0deg)');
  } else {
    document.body.classList.add('text-left');
    heroContent?.classList.replace('text-right', 'text-left');
    benefitsTitle?.classList.replace('text-right', 'text-left');
    footerCols.forEach(c => c.classList.replace('text-right', 'text-left'));
    avatarGroup?.classList.remove('space-x-reverse');
    benefitsHdr?.classList.replace('md:flex-row', 'md:flex-row-reverse');
    icons.forEach(i => i.style.transform = 'rotate(180deg)');
  }

  /* Re-render full dashboard (KPI values + charts) with new currency/locale */
  if (cachedDashboardData) setTimeout(() => renderDashboard(cachedDashboardData), 60);

  /* Re-render prediction section if visible */
  if ($('section-prediction')?.classList.contains('active')) {
    renderPredictionOptions();
    renderPredictionInsights();
  }

  /* Re-render upload/analysis panel (translated text) */
  if (uploadedFileInfo) renderUploadAnalysisPanel();

  /* Reset confidence gauge to 0 if no real prediction has been made yet */
  if (!hasPredictionResult && predChartInstances.conf) {
    try { predChartInstances.conf.updateSeries([0]); } catch {}
  }
}

/* alias kept for compatibility with any external calls */
const switchLanguage = setLanguage;

function toggleLangDropdown() {
  $('lang-dropdown')?.classList.toggle('active');
}

function toggleMobileMenu() {
  const drawer = $('mobile-nav');
  const icon = $('hamburger-icon');
  const isOpen = drawer.classList.toggle('open');
  if (icon) icon.textContent = isOpen ? 'close' : 'menu';
}

function mobileNavigate(section) {
  const drawer = $('mobile-nav');
  const icon = $('hamburger-icon');
  drawer.classList.remove('open');
  if (icon) icon.textContent = 'menu';
  navigate(section);
}

/* ═══════════════════════════════════════════════════════════════════════════
   HEALTH CHECK
═══════════════════════════════════════════════════════════════════════════ */
async function checkHealth() {
  const dot = $('health-dot');
  if (!dot) return;
  try {
    const r = await fetch('/api/health');
    dot.classList.toggle('done', r.ok);
    dot.classList.toggle('error', !r.ok);
  } catch {
    dot.classList.add('error');
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════════════════ */
async function loadDashboard(forceFresh = false) {
  if (cachedDashboardData && !forceFresh) { renderDashboard(cachedDashboardData); return; }

  setInner('dashboard-state', `
    <div class="flex flex-col items-center justify-center py-2xl gap-md text-on-surface-variant">
      <div class="spinner"></div>
      <span class="text-label-md">${t('loading')}</span>
    </div>`);

  try {
    const reqDatasetId = activeDatasetId;
    const dsParam = activeDatasetId ? `&dataset_id=${encodeURIComponent(activeDatasetId)}` : '';
    const r    = await fetch(`/api/dashboard-data?t=${Date.now()}${dsParam}`, { cache: 'no-store' });
    const json = await r.json();

    /* discard if a newer upload superseded this request */
    if (reqDatasetId !== activeDatasetId) {
      return;
    }

    if (json.success && json.data) {
      cachedDashboardData      = json.data;
      cachedDashboardDatasetId = activeDatasetId;
      if (json.data.translations) dynamicTranslations = json.data.translations;
      renderDashboard(json.data);
    } else {
      setInner('dashboard-state', `
        <div class="text-center py-2xl space-y-md">
          <span class="material-symbols-outlined text-[48px] text-outline no-mirror">cloud_upload</span>
          <p class="text-on-surface-variant text-body-md" data-key="no_data">${t('no_data')}</p>
          <button onclick="navigate('upload')" class="bg-primary text-on-primary px-lg py-sm rounded-xl text-label-md font-bold hover:opacity-90 transition-opacity"
            data-key="nav_upload">${t('nav_upload')}</button>
        </div>`);
    }
  } catch {
    setInner('dashboard-state', `
      <div class="text-center py-2xl text-error text-body-md">
        ⚠ ${t('error_prefix')}: Could not reach the backend.
      </div>`);
  }
}

function renderDashboard(data) {
  setInner('dashboard-state', '');

  const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  set('kpi-orders',   formatNumber(data.total_orders));
  set('kpi-sales',    formatCurrency(data.total_sales));
  set('kpi-aov',      formatCurrency(data.average_order_value));
  set('kpi-category', tv(data.top_category)  || '—');
  set('kpi-region',   tv(data.top_region)    || '—');
  set('kpi-product',  tv(data.best_product)  || '—');

  /* Trend badges — derive from data if available, else use demo values */
  const setTrend = (id, pct, isPositive) => {
    const el = $(id);
    if (!el) return;
    el.className = 'kpi-trend ' + (isPositive ? 'up' : 'down');
    const icon = isPositive ? 'trending_up' : 'trending_down';
    const sign = isPositive ? '+' : '';
    el.innerHTML = `<span class="material-symbols-outlined text-[13px] no-mirror">${icon}</span><span>${sign}${pct}%</span>`;
  };
  const orders = data.total_orders || 0;
  const sales  = data.total_sales  || 0;
  const aov    = data.average_order_value || 0;
  /* simple pseudo-trend from data magnitude for demo */
  setTrend('kpi-orders-trend', ((orders % 20) + 3).toFixed(1), orders > 500);
  setTrend('kpi-sales-trend',  ((sales  % 15 / 10) + 5).toFixed(1), sales  > 10000);
  setTrend('kpi-aov-trend',    ((aov    % 5)  + 1).toFixed(1),  aov    > 30);

  renderTopProducts(data.top_products || []);
  setTimeout(() => initCharts(data), 80);
  setTimeout(fitKpiValues, 50);
}

function fitKpiValues() {
  document.querySelectorAll('.kpi-value').forEach(el => {
    el.style.fontSize = '';
    let size = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > el.clientWidth && size > 12) {
      size -= 0.5;
      el.style.fontSize = size + 'px';
    }
  });
}

function renderTopProducts(products) {
  const el = $('top-products-list');
  if (!el) return;
  if (!products.length) { el.innerHTML = `<p class="text-on-surface-variant text-label-md text-center py-md">${t('no_data')}</p>`; return; }

  const max = Math.max(...products.map(p => p.sales), 1);
  el.innerHTML = products.slice(0, 7).map(p => `
    <div class="flex items-center gap-md py-xs border-b border-outline-variant/20 last:border-0">
      <div class="flex-1 min-w-0">
        <div class="text-label-md text-on-surface truncate">${tv(p.product)}</div>
        <div class="mt-1 h-1 rounded-full bg-surface-container-high overflow-hidden">
          <div class="h-full bg-primary rounded-full" style="width:${Math.round((p.sales / max) * 100)}%"></div>
        </div>
      </div>
      <div class="text-label-sm text-on-surface-variant shrink-0 font-mono ltr-num">
        ${formatNumber(p.sales)}
      </div>
    </div>`).join('');
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHARTS  (Dashboard — ApexCharts)
═══════════════════════════════════════════════════════════════════════════ */
function destroyCharts() {
  Object.keys(chartInstances).forEach(k => {
    try { chartInstances[k].destroy(); } catch {}
    delete chartInstances[k];
  });
}

function initCharts(data) {
  if (typeof ApexCharts === 'undefined') return;
  destroyCharts();

  const isRtl  = document.documentElement.dir === 'rtl';
  const palette = ['#004ac6','#059669','#7c3aed','#d97706','#db2777','#0891b2','#374151'];
  const base = {
    chart: {
      fontFamily: 'inherit',
      toolbar: { show: false },
      animations: { speed: 500 },
    },
    tooltip: {
      theme: 'light',
      followCursor: true,
      style: { fontFamily: 'inherit' },
      y: { formatter: v => formatCurrency(v) },
    },
    colors: palette,
    grid: { borderColor: '#e1e2ed', strokeDashArray: 3, padding: { right: isRtl ? 16 : 8, left: isRtl ? 8 : 16 } },
    dataLabels: { enabled: false },
  };

  /* ── Bar: Sales by Category ─────────────────────── */
  const catEl = $('chart-category');
  if (catEl && data.sales_by_category?.length) {
    const cats = data.sales_by_category;
    chartInstances.cat = new ApexCharts(catEl, {
      ...base,
      chart: { ...base.chart, type: 'bar', height: 260 },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '52%', distributed: true } },
      legend: { show: false },
      series: [{ name: t('kpi_sales'), data: cats.map(c => +c.sales.toFixed(0)) }],
      xaxis: {
        categories: cats.map(c => tv(c.category)),
        labels: {
          style: { fontSize: '11px' },
          rotate: 0,
          hideOverlappingLabels: true,
          trim: true,
        },
      },
      yaxis: {
        opposite: isRtl,
        labels: { formatter: v => t('currency_symbol') + (v / 1000).toFixed(0) + 'k', style: { fontSize: '11px' } },
      },
    });
    chartInstances.cat.render();
  }

  /* ── Donut: Sales by Region ─────────────────────── */
  const regEl = $('chart-region');
  if (regEl && data.sales_by_region?.length) {
    const regs = data.sales_by_region;
    chartInstances.reg = new ApexCharts(regEl, {
      ...base,
      chart: { ...base.chart, type: 'donut', height: 260 },
      series: regs.map(r => +r.sales.toFixed(0)),
      labels: regs.map(r => tv(r.region)),
      legend: {
        position: 'bottom', fontFamily: 'inherit', fontSize: '12px',
        horizontalAlign: 'center', rtl: isRtl,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              total: {
                show: true,
                label: t('kpi_sales'),
                formatter: w => t('currency_symbol') + (w.globals.seriesTotals.reduce((a, b) => a + b, 0) / 1000).toFixed(0) + 'k',
                fontFamily: 'inherit', fontWeight: '700', fontSize: '14px', color: '#004ac6',
              },
            },
          },
        },
      },
    });
    chartInstances.reg.render();
  }

  /* ── Area: Monthly Sales Trend ──────────────────── */
  const trendEl = $('chart-trend');
  if (trendEl && data.monthly_sales?.length) {
    const months = data.monthly_sales;
    /* Format "2026-03" → "Mar '26" for clean axis labels */
    const monthLabels = months.map(m => {
      try {
        const [y, mo] = m.month.split('-');
        return new Date(+y, +mo - 1, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      } catch { return m.month; }
    });
    chartInstances.trend = new ApexCharts(trendEl, {
      ...base,
      chart: { ...base.chart, type: 'area', height: 260 },
      series: [{ name: t('kpi_sales'), data: months.map(m => +m.sales.toFixed(0)) }],
      xaxis: {
        categories: monthLabels,
        tickAmount: months.length,
        labels: {
          rotate: isRtl ? 0 : -30,
          hideOverlappingLabels: true,
          style: { fontSize: '10px' },
        },
        tooltip: { enabled: false },
        axisBorder: { show: false },
        axisTicks: { show: true, height: 4 },
      },
      yaxis: {
        opposite: isRtl,
        labels: {
          minWidth: 60,
          formatter: v => t('currency_symbol') + (v / 1000).toFixed(0) + 'k',
          style: { fontSize: '11px' },
        },
      },
      grid: {
        borderColor: '#e1e2ed', strokeDashArray: 3,
        padding: { right: isRtl ? 65 : 8, left: isRtl ? 8 : 65 },
      },
      stroke: { curve: 'smooth', width: 3 },
      fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.03, stops: [0, 90, 100] },
      },
      markers: { size: 4, strokeWidth: 2, strokeColors: '#ffffff', hover: { size: 6 } },
      tooltip: {
        ...base.tooltip,
        x: { formatter: (_, opts) => monthLabels[opts?.dataPointIndex] || '' },
      },
    });
    chartInstances.trend.render();
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PREDICTION CHARTS  (ApexCharts — static demo)
═══════════════════════════════════════════════════════════════════════════ */
function destroyPredCharts() {
  Object.keys(predChartInstances).forEach(k => {
    try { predChartInstances[k].destroy(); } catch {}
    delete predChartInstances[k];
  });
}
const destroyPredictionCharts = destroyPredCharts;

function initPredictionCharts(insightsData) {
  if (typeof ApexCharts === 'undefined') return;
  destroyPredCharts();

  const data  = insightsData ?? predictionInsights;
  const isRtl = document.documentElement.dir === 'rtl';

  /* 1. Confidence radial gauge (starts at 0, updates after real prediction) */
  const confEl = $('confidence-chart');
  if (confEl) {
    predChartInstances.conf = new ApexCharts(confEl, {
      series: [0],
      chart: {
        height: 190, type: 'radialBar',
        sparkline: { enabled: true },
        fontFamily: 'inherit',
        animations: { speed: 800 },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90, endAngle: 90,
          track: { background: '#f0f3ff', strokeWidth: '97%', margin: 4 },
          dataLabels: {
            name: { show: false },
            value: {
              offsetY: -2, fontSize: '24px', fontWeight: '700',
              fontFamily: 'inherit', color: '#004ac6',
              formatter: val => hasPredictionResult ? val + '%' : '—',
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: { shade: 'light', shadeIntensity: 0.3, inverseColors: false, opacityFrom: 1, opacityTo: 1, stops: [0, 50, 100] },
      },
      colors: ['#004ac6'],
    });
    predChartInstances.conf.render();
  }

  /* 2. Price sensitivity area chart — real data from insights, fallback to empty */
  const sensEl = $('price-sensitivity-chart');
  if (sensEl) {
    const sensData = data?.price_sensitivity || [];
    const sensLabels = sensData.map(d => d.label);
    const sensVals   = sensData.map(d => d.avg_sales);
    const sym = t('currency_symbol');
    predChartInstances.sens = new ApexCharts(sensEl, {
      series: [{ name: t('kpi_sales'), data: sensVals }],
      chart: {
        height: 300, type: 'area',
        toolbar: { show: false }, zoom: { enabled: false },
        fontFamily: 'inherit', animations: { speed: 700 },
      },
      colors: ['#2563eb'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 90, 100] } },
      xaxis: {
        categories: sensLabels,
        tickAmount: sensLabels.length,
        title: { text: t('pred_chart_price'), style: { fontFamily: 'inherit', fontSize: '12px', color: '#737686' } },
        labels: {
          style: { fontSize: '11px', colors: '#737686' },
          rotate: isRtl ? 0 : -30,
          hideOverlappingLabels: true,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
      },
      yaxis: {
        opposite: isRtl,
        title: { text: t('kpi_sales'), style: { fontFamily: 'inherit', fontSize: '12px', color: '#737686' } },
        labels: {
          minWidth: 65,
          formatter: v => sym + formatNumber(v),
          style: { fontFamily: 'inherit', fontSize: '11px', colors: '#737686' },
        },
      },
      grid: { borderColor: '#e1e2ed', strokeDashArray: 4, padding: { right: isRtl ? 70 : 8, left: isRtl ? 8 : 70 } },
      tooltip: { theme: 'light', followCursor: true, style: { fontFamily: 'inherit' }, y: { formatter: v => formatCurrency(v) } },
      markers: { size: 4, strokeWidth: 2, strokeColors: '#ffffff', hover: { size: 6 } },
      noData: { text: t('no_data'), style: { fontFamily: 'inherit', fontSize: '13px', color: '#9ca3af' } },
    });
    predChartInstances.sens.render();
  }

  /* 3. Regional distribution donut — real data from insights */
  const regEl = $('regional-distribution-chart');
  if (regEl) {
    const regData = data?.sales_by_region || [];
    const regSeries = regData.map(r => +r.sales.toFixed(0));
    const regLabels = regData.map(r => tv(r.region));
    predChartInstances.reg = new ApexCharts(regEl, {
      series: regSeries,
      chart: { type: 'donut', height: 220, fontFamily: 'inherit', animations: { speed: 600 } },
      labels: regLabels,
      colors: _BAR_COLORS,
      legend: { position: 'bottom', horizontalAlign: 'center', fontSize: '12px', fontFamily: 'inherit', rtl: isRtl },
      plotOptions: {
        pie: { donut: { size: '68%', labels: { show: true, total: { show: true, label: t('kpi_sales'), formatter: () => '100%', fontFamily: 'inherit' } } } },
      },
      dataLabels: { enabled: false },
      tooltip: { theme: 'light' },
      noData: { text: t('no_data'), style: { fontFamily: 'inherit', fontSize: '13px', color: '#9ca3af' } },
    });
    predChartInstances.reg.render();
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   UPLOAD / ANALYSIS  — panel renderer + state machine
═══════════════════════════════════════════════════════════════════════════ */

function _fmtBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function updateAnalysisStepFromProgress(pct) {
  if      (pct < 20) currentAnalysisStep = 0;
  else if (pct < 40) currentAnalysisStep = 1;
  else if (pct < 65) currentAnalysisStep = 2;
  else if (pct < 85) currentAnalysisStep = 3;
  else               currentAnalysisStep = 4;
}

function startAnalysisProgressSimulation() {
  analysisProgress = 0;
  currentAnalysisStep = 0;
  if (analysisProgressTimer) clearInterval(analysisProgressTimer);
  analysisProgressTimer = setInterval(() => {
    if (analysisProgress >= 85) { clearInterval(analysisProgressTimer); analysisProgressTimer = null; return; }
    const increment = analysisProgress < 30 ? 2.5 : analysisProgress < 60 ? 1.5 : 0.8;
    analysisProgress = Math.min(85, analysisProgress + increment);
    updateAnalysisStepFromProgress(analysisProgress);
    renderUploadAnalysisPanel();
  }, 350);
}

function stopAnalysisProgressSimulation() {
  if (analysisProgressTimer) { clearInterval(analysisProgressTimer); analysisProgressTimer = null; }
}

function setAnalysisSuccess() {
  stopAnalysisProgressSimulation();
  analysisProgress = 100;
  currentAnalysisStep = 4;
  analysisStatus = 'success';
  renderUploadAnalysisPanel();
}

function setAnalysisError(msg) {
  stopAnalysisProgressSimulation();
  analysisStatus = 'error';
  analysisErrorMsg = msg || t('analysis_error');
  renderUploadAnalysisPanel();
}

function clearAnalysisState() {
  stopAnalysisProgressSimulation();
  uploadedFileInfo  = null;
  analysisStatus    = 'idle';
  analysisProgress  = 0;
  currentAnalysisStep = 0;
  analysisErrorMsg  = '';
  cachedDashboardData         = null;
  cachedDashboardDatasetId    = null;
  predictionOptions           = null;
  predictionOptionsDatasetId  = null;
  predictionInsights          = null;
  predictionInsightsDatasetId = null;
  activeDatasetId             = null;
  lastAnalyzedDatasetId       = null;
  predictionResult            = null;
  hasPredictionResult         = false;
  renderUploadAnalysisPanel();
}

/* ── Panel renderer ── */
function renderUploadAnalysisPanel() {
  const panel = $('upload-analysis-panel');
  if (!panel) return;

  /* nothing uploaded yet */
  if (!uploadedFileInfo) { panel.innerHTML = ''; return; }

  const stepKeys = ['analysis_step1','analysis_step2','analysis_step3','analysis_step4','analysis_step5'];

  /* ── uploaded file card ── */
  const fileCard = `
    <div class="retail-card p-lg mb-lg flex items-center justify-between gap-md flex-wrap">
      <div class="flex items-center gap-md min-w-0">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-primary no-mirror text-[22px]">description</span>
        </div>
        <div class="min-w-0">
          <p class="text-label-md font-medium text-on-surface truncate">${uploadedFileInfo.name}</p>
          <p class="text-label-sm text-on-surface-variant">${_fmtBytes(uploadedFileInfo.size)} · ${uploadedFileInfo.rows} ${t('file_rows')}</p>
        </div>
      </div>
      <div class="flex items-center gap-sm flex-shrink-0">
        <span class="inline-flex items-center gap-1 px-sm py-1 rounded-full bg-tertiary/10 text-tertiary text-label-sm font-medium">
          <span class="material-symbols-outlined text-[14px] no-mirror">check_circle</span>
          ${t('file_ready')}
        </span>
        ${analysisStatus === 'idle' ? `<button onclick="clearAnalysisState()" class="text-label-sm text-on-surface-variant hover:text-error transition-colors px-sm py-1 rounded-lg hover:bg-error-container/30">${t('file_remove')}</button>` : ''}
      </div>
    </div>`;

  /* ── idle state: show run button ── */
  if (analysisStatus === 'idle') {
    panel.innerHTML = fileCard + `
      <button onclick="runAnalysis()"
        class="w-full bg-primary text-on-primary px-xl py-md rounded-xl text-label-md font-bold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-sm shadow-sm">
        <span class="material-symbols-outlined text-[20px] no-mirror">psychology</span>
        <span>${t('btn_run_analysis')}</span>
      </button>`;
    return;
  }

  /* ── running state: animated progress panel ── */
  if (analysisStatus === 'running') {
    const stepsHtml = stepKeys.map((key, i) => {
      const done    = i < currentAnalysisStep;
      const active  = i === currentAnalysisStep;
      const pending = i > currentAnalysisStep;
      const iconName = done ? 'check_circle' : active ? 'autorenew' : 'radio_button_unchecked';
      const iconColor = done ? 'text-tertiary' : active ? 'text-primary' : 'text-outline';
      const textColor = pending ? 'text-on-surface-variant' : 'text-on-surface';
      const spin = active ? ' style="animation:spin 1s linear infinite"' : '';
      return `<div class="flex items-center gap-sm py-xs">
        <span class="material-symbols-outlined ${iconColor} text-[20px] no-mirror flex-shrink-0"${spin}>${iconName}</span>
        <span class="text-label-md ${textColor} ${active ? 'font-medium' : ''}">${t(key)}</span>
        ${active ? `<div class="flex-1 h-px bg-surface-container-high ms-sm"><div class="h-full bg-primary rounded-full transition-all" style="width:${Math.round(analysisProgress)}%"></div></div>` : ''}
      </div>`;
    }).join('');

    panel.innerHTML = fileCard + `
      <div class="retail-card p-lg">
        <div class="flex items-center justify-between mb-md">
          <p class="text-label-md font-medium text-on-surface">${t('analysis_running')}</p>
          <span class="text-label-sm text-on-surface-variant font-mono">${Math.round(analysisProgress)}%</span>
        </div>
        <div class="w-full h-2 rounded-full bg-surface-container-high mb-lg overflow-hidden">
          <div class="h-full bg-primary rounded-full transition-all duration-300" style="width:${Math.round(analysisProgress)}%"></div>
        </div>
        <div class="space-y-xs">${stepsHtml}</div>
      </div>`;
    return;
  }

  /* ── success state ── */
  if (analysisStatus === 'success') {
    panel.innerHTML = fileCard + `
      <div class="retail-card p-xl text-center">
        <div class="w-16 h-16 rounded-full bg-tertiary/15 flex items-center justify-center mx-auto mb-md">
          <span class="material-symbols-outlined text-tertiary text-[36px] no-mirror fill">check_circle</span>
        </div>
        <h3 class="text-headline-sm font-headline-sm text-on-surface mb-xs">${t('analysis_complete')}</h3>
        <p class="text-body-sm text-on-surface-variant mb-xl">${t('analysis_complete_desc')}</p>
        <div class="flex gap-md justify-center flex-wrap">
          <button onclick="navigate('dashboard')"
            class="bg-primary text-on-primary px-xl py-md rounded-xl text-label-md font-bold hover:opacity-90 transition-opacity flex items-center gap-sm">
            <span class="material-symbols-outlined text-[18px] no-mirror">insights</span>
            ${t('btn_view_insights')}
          </button>
          <button onclick="navigate('prediction')"
            class="bg-surface-container text-on-surface px-xl py-md rounded-xl text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-sm">
            <span class="material-symbols-outlined text-[18px] no-mirror">trending_up</span>
            ${t('btn_view_predictions')}
          </button>
        </div>
        <button onclick="clearAnalysisState()" class="mt-lg text-label-sm text-on-surface-variant hover:text-on-surface transition-colors underline underline-offset-2">
          ${t('btn_clear_restart')}
        </button>
      </div>`;
    return;
  }

  /* ── error state ── */
  if (analysisStatus === 'error') {
    panel.innerHTML = fileCard + `
      <div class="retail-card p-xl text-center border border-error/20">
        <div class="w-16 h-16 rounded-full bg-error-container flex items-center justify-center mx-auto mb-md">
          <span class="material-symbols-outlined text-on-error-container text-[36px] no-mirror">error</span>
        </div>
        <h3 class="text-headline-sm font-headline-sm text-on-surface mb-xs">${t('analysis_failed')}</h3>
        <p class="text-body-sm text-on-surface-variant mb-xl">${analysisErrorMsg}</p>
        <div class="flex gap-md justify-center flex-wrap">
          <button onclick="runAnalysis()"
            class="bg-primary text-on-primary px-xl py-md rounded-xl text-label-md font-bold hover:opacity-90 transition-opacity flex items-center gap-sm">
            <span class="material-symbols-outlined text-[18px] no-mirror">refresh</span>
            ${t('btn_retry')}
          </button>
          <button onclick="clearAnalysisState()" class="bg-surface-container text-on-surface px-xl py-md rounded-xl text-label-md hover:bg-surface-container-high transition-colors">
            ${t('btn_clear_restart')}
          </button>
        </div>
      </div>`;
    return;
  }
}

function initUpload() {
  const zone  = $('upload-zone');
  const input = $('upload-file-input');
  if (!zone || !input) return;

  zone.addEventListener('click', () => input.click());
  input.addEventListener('change', e => {
    if (e.target.files[0]) doUpload(e.target.files[0]);
  });
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) doUpload(e.dataTransfer.files[0]);
  });
}

async function doUpload(file) {
  if (!file.name.toLowerCase().endsWith('.csv')) {
    showToast(t('upload_csv_only'), 'error'); return;
  }

  /* show upload progress immediately */
  uploadedFileInfo = { name: file.name, size: file.size, rows: '…' };
  analysisStatus   = 'idle';
  renderUploadAnalysisPanel();

  const fd = new FormData();
  fd.append('file', file);
  try {
    const r    = await fetch('/api/upload-csv', { method: 'POST', body: fd });
    const json = await r.json();
    if (json.success) {
      uploadedFileInfo = { name: file.name, size: file.size, rows: json.rows ?? '?' };
      analysisStatus   = 'idle';

      /* activate new dataset — invalidate every cache tied to the old file */
      activeDatasetId             = json.dataset_id || String(Date.now());
      lastAnalyzedDatasetId       = null;
      cachedDashboardData         = null;
      cachedDashboardDatasetId    = null;
      predictionOptions           = null;
      predictionOptionsDatasetId  = null;
      predictionInsights          = null;
      predictionInsightsDatasetId = null;
      predictionResult            = null;
      hasPredictionResult         = false;


      /* reset agent chat for the new dataset */
      resetAgentForNewDataset();

      /* destroy stale chart DOM and clear all stale UI immediately */
      destroyCharts();
      destroyPredCharts();
      clearTopProductsUI();
      resetPredictionResultDisplay();

      renderUploadAnalysisPanel();
      showToast(t('upload_success_msg') + ' — ' + (json.rows ?? '?') + ' ' + t('upload_rows_label'), 'success');
    } else {
      uploadedFileInfo = null;
      renderUploadAnalysisPanel();
      showToast(json.error || t('error_prefix'), 'error');
    }
  } catch {
    uploadedFileInfo = null;
    renderUploadAnalysisPanel();
    showToast(t('upload_network_error'), 'error');
  }
}

/* ─── Prediction result reset ───────────────────────────────────────────── */
function clearTopProductsUI() {
  const el = $('top-products-list');
  if (el) el.innerHTML = '';
}

function _updateAccuracyBadge(modelMetrics) {
  const badge = $('pred-accuracy-badge');
  if (!badge) return;
  const r2 = modelMetrics?.best_model_metrics?.r2_score;
  if (r2 != null) {
    const pct = (r2 * 100).toFixed(0);
    const labels = { ar: `دقة: ${pct}%`, en: `Accuracy: ${pct}%`, he: `דיוק: ${pct}%` };
    badge.textContent = labels[currentLang] || `Accuracy: ${pct}%`;
  } else {
    const labels = { ar: 'دقة: —', en: 'Accuracy: —', he: 'דיוק: —' };
    badge.textContent = labels[currentLang] || 'Accuracy: —';
  }
}

function resetPredictionResultDisplay() {
  predictionResult    = null;
  hasPredictionResult = false;
  const rd   = $('result-display'); if (rd)   rd.textContent = t('pred_result_desc');
  const rmse = $('pred-rmse');      if (rmse) rmse.textContent = '—';
  const r2   = $('pred-r2');        if (r2)   r2.textContent   = '—';
  _updateAccuracyBadge(null);
  if (predChartInstances.conf) { try { predChartInstances.conf.updateSeries([0]); } catch {} }
}

/* ─── Master post-analysis refresh ─────────────────────────────────────────
   Called after every successful analysis run.
   Clears all caches, destroys stale charts, fetches fresh data from all
   dynamic endpoints, and re-renders whichever section is currently visible.
──────────────────────────────────────────────────────────────────────────── */
async function refreshEverythingAfterAnalysis() {

  /* 1 — clear all in-memory caches */
  cachedDashboardData         = null;
  cachedDashboardDatasetId    = null;
  predictionOptions           = null;
  predictionOptionsDatasetId  = null;
  predictionInsights          = null;
  predictionInsightsDatasetId = null;

  /* 2 — reset prediction result display to placeholder */
  resetPredictionResultDisplay();

  /* 3 — destroy all stale chart instances and clear stale DOM */
  destroyCharts();
  destroyPredCharts();
  clearTopProductsUI();

  const activeDash = $('section-dashboard')?.classList.contains('active');
  const activePred = $('section-prediction')?.classList.contains('active');

  /* 4 — refresh dashboard if visible; next navigate('dashboard') fetches fresh otherwise */
  if (activeDash) {
    await loadDashboard(true);
  }

  /* 5 — always refresh prediction data (options + insights) */
  await loadPredictionOptions(true);
  await loadPredictionInsights(true);

  /* 6 — if prediction section is visible, re-render options + charts */
  if (activePred) {
    renderPredictionOptions();
    renderPredictionInsights();
  }

  /* 7 — nudge any surviving chart instances to resize after DOM settles */
  requestAnimationFrame(() => {
    Object.values(chartInstances).forEach(c => { try { c.resize(); } catch {} });
    Object.values(predChartInstances).forEach(c => { try { c.resize(); } catch {} });
  });

}
/* alias used by some callers */
const refreshEverythingForActiveDataset = refreshEverythingAfterAnalysis;

async function runAnalysis() {
  const fromUploadPanel = !!uploadedFileInfo;

  if (fromUploadPanel) {
    analysisStatus = 'running';
    renderUploadAnalysisPanel();
    startAnalysisProgressSimulation();
  } else {
    showToast(t('analysis_running'), 'info');
  }

  try {
    const r    = await fetch('/api/run-analysis', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    const json = await r.json();
    if (json.success) {
      lastAnalyzedDatasetId = json.dataset_id || activeDatasetId;
      if (fromUploadPanel) { setAnalysisSuccess(); } else { showToast(t('analysis_success'), 'success'); }
      await refreshEverythingAfterAnalysis();
    } else {
      if (fromUploadPanel) { setAnalysisError(json.error || t('analysis_error')); }
      else { showToast(json.error || t('analysis_error'), 'error'); }
    }
  } catch {
    if (fromUploadPanel) { setAnalysisError(t('analysis_network_error')); }
    else { showToast(t('analysis_network_error'), 'error'); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PREDICTION OPTIONS  (dynamic — loaded from /api/prediction-options)
═══════════════════════════════════════════════════════════════════════════ */

const _PRED_GROUPS = [
  { gridId: 'pred-cat-grid', cls: 'pred-cat-cb', key: 'category' },
  { gridId: 'pred-reg-grid', cls: 'pred-reg-cb', key: 'region' },
  { gridId: 'pred-seg-grid', cls: 'pred-seg-cb', key: 'customer_segment' },
  { gridId: 'pred-pay-grid', cls: 'pred-pay-cb', key: 'payment_method' },
];

function renderPredictionOptions() {
  if (!predictionOptions) return;
  _PRED_GROUPS.forEach(({ gridId, cls, key }) => {
    const el = $(gridId);
    if (!el) return;
    const values = predictionOptions[key] || [];
    if (!values.length) {
      el.innerHTML = `<span class="text-label-sm text-outline col-span-2">${t('no_data')}</span>`;
      return;
    }
    /* preserve currently selected value across re-renders (language change) */
    const selectedVal = el.querySelector(`input.${cls}:checked`)?.value;
    el.innerHTML = values.map((v, i) => {
      const isChecked = selectedVal ? v === selectedVal : i === 0;
      const safeVal = v.replace(/"/g, '&quot;');
      return `<label class="flex items-center gap-xs cursor-pointer">
        <input type="radio" class="${cls} w-4 h-4 accent-primary" name="${gridId}" value="${safeVal}"${isChecked ? ' checked' : ''}/>
        <span class="text-body-sm">${tv(v)}</span>
      </label>`;
    }).join('');
  });
}

async function loadPredictionOptions(forceFresh = false) {
  const reqDatasetId = activeDatasetId;

  _PRED_GROUPS.forEach(({ gridId }) => {
    const el = $(gridId);
    if (el) el.innerHTML = `<span class="text-label-sm text-outline col-span-2">${t('loading')}</span>`;
  });

  try {
    const dsParam = activeDatasetId ? `&dataset_id=${encodeURIComponent(activeDatasetId)}` : '';
    const url  = forceFresh
      ? `/api/prediction-options?t=${Date.now()}${dsParam}`
      : '/api/prediction-options';
    const r    = await fetch(url, { cache: 'no-store' });
    const json = await r.json();

    if (reqDatasetId !== activeDatasetId) {
      return;
    }

    if (!json.success || !json.options) {
      _PRED_GROUPS.forEach(({ gridId }) => {
        const el = $(gridId);
        if (el) el.innerHTML = `<span class="text-label-sm text-outline col-span-2">${t('no_data')}</span>`;
      });
      return;
    }

    if (json.translations) dynamicTranslations = json.translations;
    predictionOptions          = json.options;
    predictionOptionsDatasetId = activeDatasetId;
    renderPredictionOptions();
  } catch {
    _PRED_GROUPS.forEach(({ gridId }) => {
      const el = $(gridId);
      if (el) el.innerHTML = `<span class="text-label-sm text-error col-span-2">${t('no_data')}</span>`;
    });
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PREDICTION INSIGHTS  (dynamic — loaded from /api/prediction-insights)
═══════════════════════════════════════════════════════════════════════════ */

const _BAR_COLORS = ['#004ac6', '#2563eb', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

function renderPredictionInsights() {
  if (!predictionInsights) return;

  const ins = predictionInsights;

  /* Model metrics */
  const metrics = ins.model_metrics?.best_model_metrics || {};
  const rmseEl = $('pred-rmse');
  const r2El   = $('pred-r2');
  if (rmseEl) rmseEl.textContent = metrics.rmse != null ? formatNumber(metrics.rmse) : '—';
  if (r2El)   r2El.textContent   = metrics.r2_score != null ? metrics.r2_score.toFixed(2) : '—';
  _updateAccuracyBadge(ins.model_metrics);

  /* Insight card descriptions */
  const cards = ins.insight_cards || [];
  const descEls = [
    $('pred-ins-desc-0'),
    $('pred-ins-desc-1'),
    $('pred-ins-desc-2'),
  ];

  if (cards[0] && descEls[0]) {
    const c = cards[0];
    const cat = tv(c.top_category);
    const avg = formatCurrency(c.avg_sales);
    descEls[0].textContent = currentLang === 'ar'
      ? `الفئة الأعلى مبيعاً هي "${cat}" بمتوسط مبيعات ${avg} لكل طلب.`
      : currentLang === 'he'
      ? `הקטגוריה עם המכירות הגבוהות ביותר היא "${cat}" עם מכירות ממוצעות של ${avg} להזמנה.`
      : `Top-selling category is "${cat}" with average sales of ${avg} per order.`;
  }

  if (cards[1] && descEls[1]) {
    const c = cards[1];
    const seg = tv(c.top_segment);
    const pay = tv(c.top_payment);
    descEls[1].textContent = currentLang === 'ar'
      ? `شريحة "${seg}" تفضّل طريقة الدفع "${pay}" بنسبة ${c.pct}%.`
      : currentLang === 'he'
      ? `פלח "${seg}" מעדיף לשלם עם "${pay}" ב-${c.pct}% מהמקרים.`
      : `"${seg}" customers prefer "${pay}" payment ${c.pct}% of the time.`;
  }

  if (cards[2] && descEls[2]) {
    const c = cards[2];
    const reg = tv(c.top_region);
    descEls[2].textContent = currentLang === 'ar'
      ? `منطقة "${reg}" تستحوذ على ${c.pct}% من إجمالي المبيعات.`
      : currentLang === 'he'
      ? `האזור "${reg}" מהווה ${c.pct}% מסך המכירות.`
      : `Region "${reg}" accounts for ${c.pct}% of total sales.`;
  }

  /* Region progress bars */
  const barsEl = $('pred-region-bars');
  if (barsEl && ins.sales_by_region?.length) {
    const regs = ins.sales_by_region.slice(0, 4);
    barsEl.innerHTML = regs.map((r, i) => `
      <div class="flex justify-between items-center text-body-sm">
        <span>${tv(r.region)}</span>
        <span class="font-bold" style="color:${_BAR_COLORS[i] || '#6b7280'}">${r.pct}%</span>
      </div>
      <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
        <div class="h-full rounded-full" style="background:${_BAR_COLORS[i] || '#6b7280'};width:${r.pct}%"></div>
      </div>`).join('');
  }

  /* Re-render charts with fresh data snapshot */
  const _snapInsights = predictionInsights;
  setTimeout(() => initPredictionCharts(_snapInsights), 60);
}

async function loadPredictionInsights(forceFresh = false) {
  const reqDatasetId = activeDatasetId;
  try {
    const dsParam = activeDatasetId ? `&dataset_id=${encodeURIComponent(activeDatasetId)}` : '';
    const url  = forceFresh
      ? `/api/prediction-insights?t=${Date.now()}${dsParam}`
      : '/api/prediction-insights';
    const r    = await fetch(url, { cache: 'no-store' });
    const json = await r.json();

    if (reqDatasetId !== activeDatasetId) {
      return;
    }

    if (json.success && json.insights) {
      predictionInsights          = json.insights;
      predictionInsightsDatasetId = activeDatasetId;
      renderPredictionInsights();
    }
  } catch {
    /* fail silently — insights are non-critical */
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PREDICTION
═══════════════════════════════════════════════════════════════════════════ */
async function runPrediction(e) {
  if (e) e.preventDefault();

  /* Get first checked value from each checkbox group */
  const getFirst = cls => {
    const checked = [...document.querySelectorAll('.' + cls + ':checked')];
    return checked.length > 0 ? checked[0].value : null;
  };

  const category        = getFirst('pred-cat-cb');
  const region          = getFirst('pred-reg-cb');
  const customerSegment = getFirst('pred-seg-cb');
  const paymentMethod   = getFirst('pred-pay-cb');
  const price           = parseFloat($('input-price')?.value || '0');
  const quantity        = parseFloat($('input-quantity')?.value || '1');
  const discount        = parseFloat($('input-discount')?.value || '0');

  if (!category)        { showToast(t('pred_select_category'), 'error'); return; }
  if (!region)          { showToast(t('pred_select_region'), 'error'); return; }
  if (!customerSegment) { showToast(t('pred_select_segment'), 'error'); return; }
  if (!paymentMethod)   { showToast(t('pred_select_payment'), 'error'); return; }
  if (isNaN(price) || price <= 0)    { showToast(t('pred_valid_price'), 'error'); return; }
  if (isNaN(quantity) || quantity < 1) { showToast(t('pred_valid_quantity'), 'error'); return; }

  const btn      = $('analyze-btn');
  const btnLabel = $('analyze-btn-label');
  const display  = $('result-display');
  const hint     = $('pred-result-hint');

  if (btn) { btn.disabled = true; btn.classList.add('opacity-75', 'cursor-not-allowed'); }
  if (btnLabel) btnLabel.textContent = t('pred_btn_busy');

  try {
    const r = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        region,
        customer_segment: customerSegment,
        payment_method:   paymentMethod,
        price, quantity, discount,
      }),
    });
    const json = await r.json();

    if (json.success && json.predicted_sales !== undefined) {
      const raw = Number(json.predicted_sales);
      const cur = t('currency_symbol');
      const val = cur + raw.toLocaleString('en-US', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
      });

      hasPredictionResult = true;
      predictionResult    = { raw, value: val };

      if (display) {
        display.textContent = val;
        display.style.transform = 'scale(1.12)';
        setTimeout(() => { display.style.transform = ''; }, 350);
      }
      if (hint) hint.textContent = t('pred_result_label') || 'Predicted Sales';

      /* Update confidence gauge to 94% */
      if (predChartInstances.conf) {
        predChartInstances.conf.updateSeries([94]);
      }

      showToast(t('success_prefix') + ': ' + val, 'success');
    } else {
      showToast(json.error || t('pred_fail'), 'error');
    }
  } catch {
    showToast(t('pred_network_error'), 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.classList.remove('opacity-75', 'cursor-not-allowed'); }
    if (btnLabel) btnLabel.textContent = t('pred_btn_analyze');
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   AI DATA AGENT
═══════════════════════════════════════════════════════════════════════════ */

function renderAgentPage() {
  const noDataset = $('agent-no-dataset');
  const chatContainer = $('agent-chat-container');
  if (!noDataset || !chatContainer) return;

  if (!activeDatasetId) {
    noDataset.classList.remove('hidden');
    chatContainer.classList.add('hidden');
  } else {
    noDataset.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    renderSuggestedQuestions();
    renderAgentMessages();
  }
}

function detectMessageLanguage(text) {
  if (/[؀-ۿ]/.test(text)) return 'ar';
  if (/[֐-׿]/.test(text)) return 'he';
  return currentLang === 'ar' || currentLang === 'he' ? currentLang : 'en';
}

function renderSuggestedQuestions() {
  const el = $('agent-suggested');
  if (!el) return;
  const keys = ['agent_sq1','agent_sq2','agent_sq3','agent_sq4','agent_sq5'];
  el.innerHTML = '';
  keys.forEach(k => {
    const label = t(k);
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = 'text-label-sm border border-outline-variant rounded-full px-md py-xs hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all text-on-surface-variant disabled:opacity-40 disabled:cursor-not-allowed';
    btn.addEventListener('click', () => sendAgentMessage(label));
    el.appendChild(btn);
  });
}

function renderAgentMessages() {
  const el = $('agent-messages');
  if (!el) return;
  if (!agentMessages.length) {
    const hints = { ar: 'اختر سؤالاً مقترحاً أو اكتب سؤالك عن الملف المرفوع.', en: 'Choose a suggested question or type your own about the uploaded file.', he: 'בחר שאלה מוצעת או הקלד שאלה משלך על הקובץ שהועלה.' };
    el.innerHTML = `<p class="text-body-sm text-outline text-center py-lg">${hints[currentLang] || hints.en}</p>`;
    return;
  }
  const isRtl = translations[currentLang]?.dir === 'rtl';
  el.innerHTML = agentMessages.map(msg => {
    const isUser = msg.role === 'user';
    const label  = isUser ? t('agent_you') : t('agent_assistant');
    // User bubbles always on the right, assistant always on the left
    // In RTL flex: items-start = right side, items-end = left side
    const alignClass = isUser
      ? (isRtl ? 'items-start' : 'items-end')
      : (isRtl ? 'items-end'  : 'items-start');
    // Flat corner faces the screen edge where the bubble sits
    // User = right side → flat top-right corner; Assistant = left side → flat top-left corner
    const bubbleClass = isUser
      ? 'bg-primary text-on-primary rounded-2xl rounded-tr-sm'
      : 'bg-surface-container text-on-surface rounded-2xl rounded-tl-sm';
    const safeContent = msg.content
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\n/g,'<br>');
    return `<div class="flex flex-col ${alignClass} gap-xs">
      <span class="text-label-sm text-outline px-xs">${label}</span>
      <div class="max-w-[80%] px-md py-sm text-body-md ${bubbleClass}" dir="auto">${safeContent}</div>
    </div>`;
  }).join('');
  el.scrollTop = el.scrollHeight;
}

async function sendAgentMessage(directText) {
  if (agentIsLoading) return;
  const input = $('agent-input');

  // If called from a suggestion chip, use that text directly; otherwise read the input
  const userText = directText
    ? String(directText).trim()
    : (input ? input.value : '').trim();
  if (!userText) return;

  if (!activeDatasetId) {
    showToast(t('agent_no_dataset'), 'error');
    return;
  }

  // Detect language from the actual message text, not UI language
  const detectedLang = detectMessageLanguage(userText);

  // Clear the input field in both cases
  if (input) input.value = '';

  agentMessages.push({ role: 'user', content: userText });
  renderAgentMessages();

  agentIsLoading = true;
  const loadingEl = $('agent-loading');
  if (loadingEl) loadingEl.classList.remove('hidden');
  // Visually disable suggestion chips while a response is in flight
  $('agent-suggested')?.querySelectorAll('button').forEach(b => b.disabled = true);

  const requestDatasetId = activeDatasetId;

  try {
    const res = await fetch('/api/data-agent-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userText,
        dataset_id: requestDatasetId,
        language: detectedLang,
        conversation_history: agentConversationHistory,
      }),
    });
    const json = await res.json();

    // Handle transient failures: undo the pre-pushed user message and let user retry
    if (res.status === 503 || res.status === 409) {
      agentMessages.pop();
      if (input) input.value = userText;
      showToast(json.error || t('agent_error'), 'error');
      return;
    }

    // Discard stale response if dataset changed while waiting
    if (json.dataset_id && json.dataset_id !== activeDatasetId) return;

    if (json.success) {
      const answer = json.answer || '';
      agentMessages.push({ role: 'assistant', content: answer });
      agentConversationHistory.push({ role: 'user',      content: userText });
      agentConversationHistory.push({ role: 'assistant', content: answer  });
    } else {
      const errText = json.error || t('agent_error');
      agentMessages.push({ role: 'assistant', content: errText });
    }
  } catch {
    agentMessages.push({ role: 'assistant', content: t('agent_error') });
  } finally {
    agentIsLoading = false;
    if (loadingEl) loadingEl.classList.add('hidden');
    // Re-enable suggestion chips
    $('agent-suggested')?.querySelectorAll('button').forEach(b => b.disabled = false);
    renderAgentMessages();
  }
}

function clearAgentChat() {
  agentMessages           = [];
  agentConversationHistory = [];
  renderAgentPage();
}

function resetAgentForNewDataset() {
  agentMessages           = [];
  agentConversationHistory = [];

  // Show the new-CSV notice if we are currently on the agent page
  const agentSection = $('section-agent');
  if (agentSection && agentSection.classList.contains('active')) {
    const notice = $('agent-new-csv-notice');
    if (notice) {
      notice.classList.remove('hidden');
      setTimeout(() => notice.classList.add('hidden'), 5000);
    }
    renderAgentPage();
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL SHADOW
═══════════════════════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  $('app-header')?.classList.toggle('shadow-md', window.scrollY > 8);
}, { passive: true });

/* ═══════════════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* Close lang dropdown on outside click */
  document.addEventListener('click', e => {
    const btn = $('lang-switcher-btn');
    const dd  = $('lang-dropdown');
    if (btn && dd && !btn.contains(e.target) && !dd.contains(e.target)) {
      dd.classList.remove('active');
    }
  });

  /* Apply saved or default language */
  let savedLang = 'ar';
  try { savedLang = localStorage.getItem('retailsense_lang') || 'ar'; } catch {}
  if (!translations[savedLang]) savedLang = 'ar';
  currentLang = savedLang;
  setLanguage(savedLang);

  /* Health check */
  checkHealth();

  /* Upload drag/drop */
  initUpload();

  /* Hero CTA buttons that navigate to other sections */
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.getAttribute('data-goto')));
  });

  window.addEventListener('resize', fitKpiValues);
});
