import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { ConfigService } from '@nestjs/config';
// import LogsService from 'src/graphql/sys/log/log.service';

// @Injectable()
// class CustomLogger extends ConsoleLogger {
//     private readonly logsService: LogsService;
//     private isProd: boolean;

//     constructor(
//         context: string,
//         options: ConsoleLoggerOptions,
//         configService: ConfigService,
//         logsService: LogsService
//     ) {
//         const isProduction = configService.get('NODE_ENV') === 'production'

//         super(
//             context,
//             {
//                 ...options,
//                 logLevels: isProduction ? ['log', 'warn', 'error'] : ['error', 'warn', 'log', 'verbose', 'debug']
//             }
//         );
//         this.isProd = isProduction;

//         this.logsService = logsService;
//     }

//     log(message: string, context?: string) {
//         if(context !== 'SQL')
//             super.log.apply(this, [message, context])
            
//         if(context === 'SQL' && this.isProd) 
//             this.logsService.createLog({
//                 message,
//                 context,
//                 level: 'log'
//             })
//     }
//     error(message: string, stack?: string, context?: string) {
//         super.error.apply(this, [message, stack, context]);

//         this.logsService.createLog({
//             message,
//             context,
//             level: 'error'
//         })
//     }
//     warn(message: string, context?: string) {
//         super.warn.apply(this, [message, context]);

//         this.logsService.createLog({
//             message,
//             context,
//             level: 'error'
//         })
//     }
//     debug(message: string, context?: string) {
//         super.debug.apply(this, [message, context]);

//         this.logsService.createLog({
//             message,
//             context,
//             level: 'error'
//         })
//     }
//     verbose(message: string, context?: string) {
//         super.debug.apply(this, [message, context]);

//         this.logsService.createLog({
//             message,
//             context,
//             level: 'error'
//         })
//     }
// }

// export default CustomLogger;